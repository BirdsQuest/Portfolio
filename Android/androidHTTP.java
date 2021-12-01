package com.birdsquest.cardviewer;

import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.os.AsyncTask;
import android.util.Log;
import android.widget.ImageView;

import java.io.InputStream;
import java.net.URL;
import java.io.IOException;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.io.BufferedOutputStream;

/*  manifest permissions
    <uses-permission android:name="android.permission.INTERNET"/>
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />

 gradle dependancies
 compile 'com.google.code.gson:gson:2.3'
    compile group: 'org.apache.httpcomponents' , name: 'httpclient-android' , version: '4.3.5.1'
*/
public class HTTP{

 public static void send(final String url, final HTTPListener listener, final String[] params){
  new Thread(){//When dealing with server communication, it's best to do it asynchronously as to not tie up tie main thread
   public void run(){
    try{
     String toPost=listener.MakeJSONToSend(params);//the listener(implemented in another class) converts the parameters to a json to send
     HttpURLConnection connection=setConnection(url, toPost);//Set up the HttpURLConnection object and open the connection
     postData(connection, toPost);//Write the post variables to the connections output stream
     getResponse(connection, listener);//Listen for a response
     connection.disconnect();//close the connection
    }catch(IOException e){e.printStackTrace();}
   }
  }.start();//Run the thread as soon as the object is created
 }
 //If sending without the String[] params, it still sends but with an empty String[]
 public static void send(String url, HTTPListener listener){send(url,listener,new String[]{});}

 static HttpURLConnection setConnection(String url,String toPost) throws IOException{
  HttpURLConnection connection=(HttpURLConnection)new URL(url).openConnection();//Create the object
  connection.setRequestProperty("Content-Type", "application/json;charset=utf-8");//Add the headers
  connection.setRequestProperty("X-Requested-With", "XMLHttpRequest");
  connection.setConnectTimeout(15000);//milliseconds - how long the connection will last before timing out(15 seconds)
  connection.setReadTimeout(10000);//milliseconds - how much time to wait for a response
  connection.setRequestMethod("POST");
  connection.setDoOutput(true);
  connection.setDoInput(true);

  if(toPost!=null){connection.setFixedLengthStreamingMode(toPost.getBytes().length);}//Set the amount of data that is going to the server
  connection.connect();
  return connection;
 }

 static void postData(HttpURLConnection connection, String toPost) throws IOException{
  if(toPost!=null){//Start Sending
   BufferedOutputStream out = new BufferedOutputStream(connection.getOutputStream());
   out.write(toPost.getBytes());//Send the post variables
   //Clear OutputStream when finished
   out.flush();
   out.close();
  } }
 
 //Listen to the response stream and rebuild the responses into one String then send back to the listener class to handle
 static void getResponse(HttpURLConnection connection, HTTPListener listener) throws IOException{
  String inputLine;
  StringBuffer responseBuffer=new StringBuffer();
  if(connection.getResponseCode()==HttpURLConnection.HTTP_OK){//If the response came back well
   BufferedReader in = new BufferedReader(new InputStreamReader(connection.getInputStream()));
   while((inputLine=in.readLine())!=null){responseBuffer.append(inputLine);}
   listener.serverResponded(responseBuffer.toString());
   in.close();
  }
 }
 static void setImage(ImageView imageView,String url){
  new DownloadImageTask(imageView).execute(url);
 }
}

//Each individual case handles the output variables and response differently
interface HTTPListener{
 public void serverResponded(String responseString);
 public String MakeJSONToSend(String[] param);
}

//Handle asynchronous image downloading
class DownloadImageTask extends AsyncTask<String, Void, Bitmap>{
 ImageView bmImage;

 public DownloadImageTask(ImageView bmImage) {
  this.bmImage = bmImage;
 }

 protected Bitmap doInBackground(String... urls) {
  String urldisplay = urls[0];
  Bitmap mIcon11 = null;
  try {
   InputStream in = new java.net.URL(urldisplay).openStream();
   mIcon11 = BitmapFactory.decodeStream(in);
  } catch (Exception e) {
   e.printStackTrace();
  }
  return mIcon11;
 }

 protected void onPostExecute(Bitmap result) {
  bmImage.setImageBitmap(result);
 }
}