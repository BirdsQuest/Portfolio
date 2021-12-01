package com.birdsquest.cardviewer;

import android.content.Context;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.PorterDuff;
import android.graphics.drawable.ColorDrawable;
import android.graphics.drawable.Drawable;
import android.os.Bundle;
import android.os.Handler;
import android.os.Parcel;
import android.os.Parcelable;
import android.support.v4.content.ContextCompat;
import android.support.v4.widget.SwipeRefreshLayout;
import android.support.v7.widget.CardView;
import android.support.v7.widget.DefaultItemAnimator;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.support.v7.widget.helper.ItemTouchHelper;
import android.util.AttributeSet;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.TextView;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;

public class DeckView extends SwipeRefreshLayout{
 private static final String TAG="TestDeck";
 Recycler list;//The visible representation of the list(Recycler)

 protected int[] layoutIDs=new int[]{R.id.name};//List of all of the layoutIDs in a Card

 public ArrayList<Card> cards=new ArrayList<>(),//All the cards in the deck
   pendingRemoval=new ArrayList(),//A list of what cards are about to be removed(unless undone)
   favorites=new ArrayList();//Favorite Cards
 HashMap<Card, Runnable> pendingRunnables = new HashMap<>(); // map of items to pending runnables, so we can cancel a removal if need be
 private Handler handler = new Handler(); // hanlder for running delayed runnables
 private static final int PENDING_REMOVAL_TIMEOUT = 3000; //3 seconds of a window to undo a delete before the card's removed

 Drawable leftColor=new ColorDrawable(Color.RED),//Delete Color
   rightColor=new ColorDrawable(Color.YELLOW),//Favoritable Color
   background=leftColor,//Plain background color
   leftIcon,rightIcon;
 int xMarkMargin;

 boolean longPressDragEnabled=true,//For dragging/dropping
   itemViewSwipeEnabled=true;//For deleting/favoriting

 public int cardLayout=R.layout.card;

 int currentTop=0;//The topmost index of the visual list

 //Constructors/Initialisation
 public DeckView(Context context){super(context);init(context,null);}
 public DeckView(Context context, AttributeSet attrs){super(context, attrs);init(context,attrs);}
 void init(Context context, AttributeSet attrs){
  if(attrs==null){//If the AttributeSet hasn't been set, set a colour screen
   setColorSchemeColors(Color.RED, Color.GREEN, Color.BLUE, Color.YELLOW);
  }
  list=new Recycler(context);//Create the list
  addView(list);  //And add it to the view
  setOnRefreshListener(onRefresh);//notifiy when the swipe gesture correctly triggers a refresh
 }

 

 //Saving/Loading states for when the screen is created/destroyed(rotated, minimised, ect)
 /** To be called in Main.java:
  * @Override protected void onSaveInstanceState(Bundle outState) {
  *     super.onSaveInstanceState(outState);
  *     deck.save(outState);
  * }
  */
 public void save(Bundle outState){
  outState.putParcelableArrayList(TAG+"_cards", cards);
  outState.putInt(TAG+"_currentTop", currentTop);
 }
 /** To be called in Main.java:
  * @Override protected void onRestoreInstanceState(Bundle savedInstanceState) {
  *     super.onRestoreInstanceState(savedInstanceState);
  *     deck.load(savedInstanceState);
  * }
  *
  * @Override protected void onResume(){
  *     super.onResume();
  *     deck.load(null);
  * }
  */
 public void load(Bundle savedInstanceState){
  if(savedInstanceState!=null){
   if(!savedInstanceState.containsKey(TAG+"_cards")){return;}
   cards=savedInstanceState.getParcelableArrayList(TAG+"_cards");
   currentTop=savedInstanceState.getInt(TAG+"_currentTop");
   if(cards.size()==0){fetchCards();}
  }else if(cards.size()==0){fetchCards();}
 }

 
 //Parcelling the Card data for saving and loading states. Called from the Card(View) class, the reason they are external from it is so they can be extended easier
 public CardObject loadParcel(Parcel in){
  String[] data=new String[2];
  in.readStringArray(data);
  return new CardObject(Integer.parseInt(data[0]),data[1]);
 }
 public void saveParcel(Parcel dest, Object card){
  CardObject cardObject=(CardObject)card;
  dest.writeStringArray(new String[] {cardObject.id+"", cardObject.name});
 }
 
 //When the user tries to drag up further than the top, the list is refreshed
 SwipeRefreshLayout.OnRefreshListener onRefresh=new SwipeRefreshLayout.OnRefreshListener(){
  @Override
  public void onRefresh() {
   fetchCards();
  }
 };
 public void fetchCards(){}//A placeholder for extentable objects, where you'd make a HTTP call to get more objects

 //Adds a Card(View) to the cards array and notifies the adapter so it can visually refresh and add it.
 void addCard(Card card){
  cards.add(card);
  adapter.notifyItemInserted(adapter.getItemCount());
 }

 //When the items are loaded, make the refeshing icon go away and update the visual list
 void onItemsLoadComplete(){
  adapter.notifyItemInserted(adapter.getItemCount());
  setRefreshing(false);
 }
 
 //Get the CardObject(card information, not display) from the cards array with the index parameter
 public CardObject get(int index){
  return (CardObject)cards.get(index).holder;
 }
 
 @Override
 public boolean canScrollVertically(int direction) {
  // check if scrolling up
  if (direction < 1) {
   boolean original = super.canScrollVertically(direction);
   return !original && getChildAt(0) != null && getChildAt(0).getTop() < 0 || original;//Determine that the user is at the top of the list
  }
  return super.canScrollVertically(direction);//Otherwise handle normally

 }

 
 
 
 //When items are deleted, the user is actually given a 3 second grace period to undo the action
 public void removalPending(int position) {
  final Card card=cards.get(position);
  if(!isPendingRemoval(position)){//Only add to pending list if it isn't already there
   pendingRemoval.add(card);//Add to the list
   // this will redraw row in "undo" state
   adapter.notifyItemChanged(position);
   // let's create, store and post a runnable to remove the item
   Runnable pendingRemovalRunnable=new Runnable(){
    @Override
    public void run() {
     removeCard(cards.indexOf(card));
    }
   };
   handler.postDelayed(pendingRemovalRunnable, PENDING_REMOVAL_TIMEOUT);
   pendingRunnables.put(card, pendingRemovalRunnable);
  }
 }
 //Simply check if the card is pending removal by seeing if it's in the array
 public boolean isPendingRemoval(int position){
  return pendingRemoval.contains(cards.get(position));
 }
 //After the removal pending timeout has completed, then remove the card. Can be expanded on in extend classes(eg adding to server)
 public Card removeCard(int position){
  Card card = cards.get(position);
  if (pendingRemoval.contains(card)) {//Make sure it's in the array list to be removed
   pendingRemoval.remove(card);//and remove it from there
  }
  if (cards.contains(card)) {//And make sure it's in the cards array list
   cards.remove(position);//Remove it from there
   adapter.notifyItemRemoved(position);//And update the visual list
  }
  return card;
 }

 //Simple favorites list adding functionality, can be expanded on in extend classes(eg adding to server)
 public Card addToFavorites(int position){
  final Card card=cards.get(position);
  if(!favorites.contains(card)){
   favorites.add(card);
  }
  return card;
 }
 
 //RecyclerView is a more advanced and flexible version of ListView
 //It reuses cells while scrolling up/down making it more memory efficient
 //It decouples the list from the container so you can set the list at runtime
 //Easy to animate list actions
 //Can use different layouts like grid
 class Recycler extends RecyclerView{
  public Recycler(Context context){
   super(context);

   itemTouchHelper.attachToRecyclerView(list);//Add drag/swipe actions
   setLayoutManager(new LinearLayoutManager(context));//Simple layout like ListView
   setItemAnimator(new DefaultItemAnimator());//basic animations on remove, add, and move events
   setAdapter(adapter);//RecyclerView.Adapter declared below
   addItemDecoration(itemDecoration);//allows the application to add a special drawing and layout offset to specific item views from the adapter's data set. This can be useful for drawing dividers between items, highlights, visual grouping boundaries and more.
   setHasFixedSize(false);//whenever items are inserted, moved or removed the size (width and height) of RecyclerView might change and in turn the size of any other view in view hierarchy might change
   leftIcon=ContextCompat.getDrawable(context,android.R.drawable.ic_menu_delete);//When swiping right, the delete icon is shown
   leftIcon.setColorFilter(Color.WHITE, PorterDuff.Mode.SRC_ATOP);
   rightIcon=ContextCompat.getDrawable(context,android.R.drawable.btn_star); //When swiping left, the bookmark(star) icon is shown
   rightIcon.setColorFilter(Color.BLACK, PorterDuff.Mode.SRC_ATOP);
   xMarkMargin=(int) context.getResources().getDimension(R.dimen.ic_clear_margin);//The space between the edge and

  }
 }

 //responsible for providing views that represent items in a data set
 RecyclerView.Adapter<Layout> adapter=new RecyclerView.Adapter<Layout>(){
  //The layout used to display each card entry
  @Override public Layout onCreateViewHolder(ViewGroup parent, int viewType){
   Card card=new Card(getContext());
   card.addView(LayoutInflater.from(getContext()).inflate(cardLayout, parent, false));
   card.setLayoutParams(new CardView.LayoutParams(CardView.LayoutParams.MATCH_PARENT, CardView.LayoutParams.WRAP_CONTENT));
   return new Layout(card.getRootView(),layoutIDs);
  }
  //Handle the regular and undo views of the slot
  @Override public void onBindViewHolder(Layout holder, int position){
   Layout viewHolder = (Layout)holder;
   final Card card=(Card)cards.get(position);
   //As above, things are on the pendingRemoval for 3 seconds when deleted in order to give a chance to undo it
   if(pendingRemoval.contains(card)){
    // we need to show the "undo" state of the row
    viewHolder.itemView.setBackgroundColor(Color.RED);
    viewHolder.content.setVisibility(View.GONE);
    viewHolder.undo.setHeight(viewHolder.content.getHeight());
    viewHolder.undo.setVisibility(View.VISIBLE);
    viewHolder.undo.setOnClickListener(new View.OnClickListener() {
     @Override
     public void onClick(View v) {
      // user wants to undo the removal, let's cancel the pending task
      Runnable pendingRemovalRunnable=pendingRunnables.get(card);
      pendingRunnables.remove(card);
      if (pendingRemovalRunnable != null) handler.removeCallbacks(pendingRemovalRunnable);
      pendingRemoval.remove(card);
      // this will rebind the row in "normal" state
      notifyItemChanged(cards.indexOf(card));
     }
    });
   }else{
    // we need to show the "normal" state
    viewHolder.itemView.setBackgroundColor(Color.WHITE);
    viewHolder.content.setVisibility(View.VISIBLE);
    viewHolder.undo.setVisibility(View.GONE);
    viewHolder.undo.setOnClickListener(null);
    ((CardObject)card.holder).setLayout(viewHolder.views);
   }
  }
  @Override public int getItemCount(){return cards.size();}
 };

 //A simple layout to handle the background of slots(behind the card) and the Card in front of it.
 public static class Layout extends RecyclerView.ViewHolder {
  ArrayList<View> views=new ArrayList<>();
  LinearLayout content;
  Button undo;
  public Layout(View itemView, int[] cardIDs){
   super(itemView);
   content=(LinearLayout)itemView.findViewById(R.id.content);
   undo=(Button)itemView.findViewById(R.id.undo);
   for(int index=0;index<cardIDs.length;index++){
    views.add(itemView.findViewById(cardIDs[index]));
 } } }


 //SimpleCallback takes in the directions that you want to enable drag-and-drop and the directions that you want to enable swiping.
 ItemTouchHelper itemTouchHelper=new ItemTouchHelper(new ItemTouchHelper.SimpleCallback(ItemTouchHelper.UP | ItemTouchHelper.DOWN, ItemTouchHelper.LEFT | ItemTouchHelper.RIGHT) {
  //Handle reordering list with dragging Cards
  @Override public boolean onMove(RecyclerView deck, RecyclerView.ViewHolder dragged, RecyclerView.ViewHolder draggedOver){
   requestDisallowInterceptTouchEvent(true);
   int from=dragged.getAdapterPosition(),
    to=draggedOver.getAdapterPosition();
    if(from<to){
     for(int index=from;index<to;index++){
      Collections.swap(cards,index,index+1);
     }}else{
    for(int index=from;index>to;index--){
     Collections.swap(cards,index,index-1);
    }}
   adapter.notifyItemMoved(from,to);
   return true;
  }

  //Handle swipes by sending them to the swipeLeft/Right functions
  @Override public void onSwiped(RecyclerView.ViewHolder viewHolder, int swipeDir){//ActionState=IDLE, SWIPE, DRAG
   int position=viewHolder.getAdapterPosition();
   if(swipeDir==ItemTouchHelper.LEFT){swipeLeft(viewHolder, position);}
   else if(swipeDir==ItemTouchHelper.RIGHT){swipeRight(viewHolder, position);}
  }

  public void swipeLeft(RecyclerView.ViewHolder viewHolder, int position){removalPending(position);}//start the removing process
  public void swipeRight(RecyclerView.ViewHolder viewHolder, int position){addToFavorites(position);}//Add it to the favorites list

  //Get the direction that the card is being swiped, unless it's pending removal. Then ignore swipes.
  @Override public int getSwipeDirs(RecyclerView recyclerView, RecyclerView.ViewHolder viewHolder) {
   return isPendingRemoval(viewHolder.getAdapterPosition())
     ?0:super.getSwipeDirs(recyclerView, viewHolder);
  }

  //Drawing the 'background', what's behind the card. This is where we draw the icons on the swipe
  public void drawBackground(Canvas canvas, View item, int xOffset){
   Drawable icon;
   int itemHeight=item.getBottom()-item.getTop(),//The height is required to vertically center the icon
     iconWidth,//how wide the icon is, used for positioning
     iconRight,//right positioning for the icon(when dragging right)
     iconLeft,//left positioning for the icon(if dragging left)
     bgLeft;//Where the color of the background starts drawing from
   
   //Set the icon and bg color/leftOffset and get its horizontal positioning depending on whether dragging left or right
   if(xOffset<0){
    icon=leftIcon;
    background=leftColor;
    bgLeft=item.getRight()+xOffset;
    iconWidth=icon.getIntrinsicWidth();
    iconRight=item.getRight()-xMarkMargin;
    iconLeft=item.getRight()-xMarkMargin-iconWidth;
   }else{
    icon=rightIcon;
    background=rightColor;
    bgLeft=item.getLeft();
    iconWidth=icon.getIntrinsicWidth();
    iconLeft=item.getLeft()+xMarkMargin;
    iconRight=item.getLeft()+xMarkMargin+iconWidth;
   }

   //These variables vertically position the icon
   int iconHeight=icon.getIntrinsicHeight(),
     iconTop=item.getTop()+(itemHeight-iconHeight)/2,
     iconBottom=iconTop+iconHeight;

   background.setBounds(bgLeft, item.getTop(), item.getRight(), item.getBottom());//Set the bounding box for the background color, based on the item demensions and where the left offset is
   icon.setBounds(iconLeft, iconTop, iconRight, iconBottom);//Set the bounding box for the icon, based on the variables worked out above

   background.draw(canvas);//Draw the bgcolor
   icon.draw(canvas);   //And draw the icon
  }

  //Draw the Cards
  @Override public void onChildDraw(Canvas canvas, RecyclerView recyclerView, RecyclerView.ViewHolder viewHolder, float dX, float dY, int actionState, boolean isCurrentlyActive){
   if(viewHolder.getAdapterPosition()==-1){return;}//The viewholders already swiped away
   drawBackground(canvas, viewHolder.itemView, (int)dX);
   super.onChildDraw(canvas, recyclerView, viewHolder, dX, dY, actionState, isCurrentlyActive);
  }

  //Allows long press for "right click" menu or drag/drop
  @Override public boolean isLongPressDragEnabled() {return longPressDragEnabled;}
  //Allows for left/right swiping to favorite/delete Cards
  @Override public boolean isItemViewSwipeEnabled(){return itemViewSwipeEnabled;}
 });

 //This allows the colours of the background to change when swiped, and the simple ripple animations when cards are touched.
 RecyclerView.ItemDecoration itemDecoration=new RecyclerView.ItemDecoration(){
  @Override public void onDraw(Canvas c, RecyclerView parent, RecyclerView.State state){
   if(parent.getItemAnimator().isRunning()){
    background.draw(c);
   }
   super.onDraw(c, parent, state);
  }
 };

 //The visual aspect of cards
 public class Card extends CardView implements Parcelable{
  Object holder;
  public Card(Context context){super(context);}
  public Card(Context context, Object object){
   super(context);
   holder=object;
   setPreventCornerOverlap(true);
   setFocusableInTouchMode(true);
   setFocusable(true);
  }

  public Card(Context context, Parcel in){//When resuming after being paused, the data is reloaded
   super(context);
   holder=loadParcel(in);
  }

  //Used to generate Card(s)
  public final Creator<Card> CREATOR=new Creator<Card>(){
   @Override
   public Card createFromParcel(Parcel in){
    return new Card(getContext(), in);
   }

   @Override
   public Card[] newArray(int size){
    return new Card[size];
   }
  };

  @Override//Requred as an override, but unnessicary
  public int describeContents(){
   return 0;
  }

  @Override//When changing orientation or pausing the application, the data is saved
  public void writeToParcel(Parcel parcel, int i){
   saveParcel(parcel, holder);
  }
 }

 //CardObject is the individual item to keep in an array, it's what the cards data is stored in
 class CardObject{
  private static final String TAG="Card";
  String name="";
  int id;
  //Any other variables go here are are set in the constructor below
  
  public CardObject(int id, String name){
   this.id=id;
   this.name=name;
  }
  
  //Get a Card(View) set to this object
  public Card getCard(){return new Card(getContext(),this);}
  //Set a view(of a Card) to the information in this object
  public void setLayout(ArrayList<View> view){
   ((TextView)view.get(0)).setText(name);
  }
 }
}