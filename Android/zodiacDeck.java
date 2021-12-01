package com.birdsquest.cardviewer;
/**In order to fit this into your package, please use change the above line to
 * your application and use ctrl+f to change Zodiac/zodiac to suit your objects
 * name. Also, ctrl+f the words "//Cards details" and change any lines below to
 * what your individual object is.
 */

import android.os.Parcel;
import android.view.View;
import java.util.ArrayList;
import android.widget.TextView;
import android.content.Context;
import android.util.AttributeSet;

public class Zodiac extends DeckView{
 private static final String TAG="Zodiac";

 //Constructors/Initialiser
 public Zodiac(Context context){super(context);init(context, null);}
 public Zodiac(Context context, AttributeSet attrs){super(context, attrs);init(context, attrs);}
 @Override void init(Context context, AttributeSet attrs){
  //You can't override class variables, but reassigning the values on initialisation essentially achieves the same thing
  cardLayout=R.layout.zodiac;
  layoutIDs=new int[]{
    R.id.name,
    //Cards details
    R.id.description
  };
  super.init(context,attrs);
 }

 //Overriding fetchCards is nessicary as the base class' fetchCards has no functionality
 //Here we are using a set 2d array to represent cards names and descriptions, but contacting the server is the most probable action. Examples of that are in News.java and JishoResults.java
 @Override public void fetchCards(){
  if(cards.size()==0){//Avoid adding them again if the deck has been initialised with the cards
   String[][] content={
     {"The Rat", "The Ox", "The Tiger", "The Rabbit", "The Dragon", "The Snake", "The Horse", "The Sheep", "The Monkey", "The Rooster", "The Dog", "The Pig"},
     {"climbed atop", "to get a better look at", "who was chasing", "who was watching", "who looked like", "with legs.", "was leisurely walking down the path with", "who was following", "who was ignoring everyone else.", "ran away from", "which was actually just chasing", "who was none the wiser"}};
   for(int index=0; index<content[0].length; index++){//Look above array and add a card for every entry
    addCard(new ZodiacObject(index,content[0][index],content[1][index]).getCard());
   }
  }
 }

 //It pays to extend the CardObject to add
 class ZodiacObject extends DeckView.CardObject{
  //Cards details, aside from name as it's in CardObject
  String description;

  //Extending the constructor and layout functions just adds in the extra variables
  public ZodiacObject(int id, String name, String description){
   super(id, name);//id and name are set in super
   this.description=description;
  }

  public void setLayout(ArrayList<View> view){
   super(view);//view.get(0) is the name, which is handled in the super
   ((TextView)view.get(1)).setText(description);
  }
 }

 //get returns a ZodiacObject rather than a CardObject(that way, the extra variable can be accessed)
 @Override public ZodiacObject get(int index){
  return (ZodiacObject)cards.get(index).holder;
 }

 //Loading/Saving Parcels needs to extend to handle the extra variables
 @Override public ZodiacObject loadParcel(Parcel in){
  ZodiacObject zodiacObject=(ZodiacObject)super.loadParcel(in);
  String[] data=new String[3];
  in.readStringArray(data);
  //Cards details
  zodiacObject.description=data[2];
  //The id and name were handled by the super call
  return zodiacObject;
 }

 @Override public void saveParcel(Parcel dest, Object cardObject) {
  ZodiacObject zodiac=(ZodiacObject)cardObject;
  dest.writeStringArray(new String[]{zodiac.id+"", zodiac.name,
   //Cards details
   zodiac.description
  });
 }
}