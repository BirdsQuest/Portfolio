import java.awt.SystemTray;
import java.awt.TrayIcon;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;
import javax.swing.ImageIcon;
import java.awt.CheckboxMenuItem;
import java.awt.MenuItem;
import java.awt.Menu;
import java.awt.PopupMenu;
import java.awt.event.ActionListener;
import java.awt.event.ActionEvent;
import java.util.Map;
import java.net.URI;
import java.net.InetAddress;
import java.io.IOException;
import java.net.URISyntaxException;
import java.net.UnknownHostException;
import java.awt.Desktop;
public class SysTray {
 public static void main(String[] args) {
  ImageIcon icon=new ImageIcon(SysTray.class.getResource("/icon.png"));//fetch the image to use for the icon
  SysTray sysTray=new SysTray(icon);//generate the SysTray object
  if(sysTray.supported){//System tray isn't supported, just open window.
   
  }
 }
 public Boolean supported;
 public SysTray(ImageIcon icon){
  if((supported=SystemTray.isSupported())==true){//Check that the system tray is supported by the Java layer of the OS
   final SystemTray systemTray = SystemTray.getSystemTray();//Get the system tray(to add the icon to)
   final TrayIcon trayIcon = new TrayIcon(icon.getImage(), "Java App");//Make the icon
   trayIcon.setImageAutoSize(true);// Autosize icon base on space
  
   //Set a double click to the icon; in this itteration, it just prints to the console but it would be used for opening a hidden window
   trayIcon.addMouseListener(new MouseAdapter(){
    @Override public void mouseClicked(MouseEvent event){
     if(event.getClickCount()==2){
      System.out.println("double clicked");
   } } });
   
   final PopupMenu popup=new PopupMenu();//Make the right click menu
   //Then start populating it
   MenuButton("Home",popup,null,new ActionListener() {//When the Home button is pressed, open the local host server in the browser
    public void actionPerformed(ActionEvent event) {
     try{
      Desktop desktop = Desktop.isDesktopSupported() ? Desktop.getDesktop() : null;
      if(desktop != null && desktop.isSupported(Desktop.Action.BROWSE)) {
       URI host=new URI("http://"+InetAddress.getLocalHost().getHostName()+":8080");
       desktop.browse(host);
     } }catch (Exception e){e.printStackTrace();}
   } });
   

   //Seperate sections with seperators
   popup.addSeparator();
   //Make and populate a submenu
   Menu menu=SubMenu("Display",popup,null);
   MenuButton("Error",menu,null);
   MenuButton("Warning",menu,null);
   MenuButton("Info",menu,null);
   MenuButton("None",menu,null);
   
   popup.addSeparator();
   
   MenuButton("About",popup,null);
   MenuButton("Exit",popup,new ActionListener(){
    public void actionPerformed(ActionEvent  e) {//Exit the program on click
     systemTray.remove(trayIcon);
     System.exit(0);
   } });

   trayIcon.setPopupMenu(popup);//Attach the menu to the icon
   try{systemTray.add(trayIcon);}//Attach the icon to the system tray
   catch(Exception e){e.printStackTrace();}
  }
 }
 public static void MenuButton(String text, Menu parent, ActionListener action){
  MenuItem item=new MenuItem(text);//Create the element
  item.addActionListener(action);//Attach the action
  parent.add(item);//Attach it to its parent menu
 }
 public static Menu SubMenu(String text, Menu parent, ActionListener action){
  Menu item=new Menu(text);//Create the element
  item.addActionListener(action);//Attach the action
  parent.add(item//Attach it to its parent menu
  return item;
 }
}