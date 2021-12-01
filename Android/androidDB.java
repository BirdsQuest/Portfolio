package com.birdsquest.bargraph;
/*SQLite 3*/
 /*  manifest permissions
    <uses-permission android:name="android.permission.INTERNET"/>
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
        gradle imports:
    compile 'org.apache.httpcomponents:httpcore:4.4.1'
    compile 'org.apache.commons:commons-io:1.3.2'
    compile 'org.apache.httpcomponents:httpclient:4.5'  */
 //eg new DB(context,"users",new String[]{"login","info"},new String[]{"username TEXT, password TEXT","firstName TEXT, lastName TEXT, email TEXT, birthday DATE"})
 //https://www.sqlite.org/datatype3.html
import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.database.SQLException;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;
import android.net.Uri;
import android.text.TextUtils;
import android.util.Log;
import java.io.BufferedOutputStream;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.Date;


public class DB{
 private static final String TAG="DB";
 public static SQLiteDatabase database;
 
 //Upon initialisation, the DB class is handed, the context, database name, names of the tables(individual strings in a String array) and fields in the tables(Strings matching the the names array, fields in each string have the field name followed by type after a space with fields delimited by commas)
 public DB(Context context, String dbName, String[] tableNames, String[] tableFields) throws SQLException{
  try{//See if the database exists(locally), create it if it doesn't.
   database=context.openOrCreateDatabase(dbName, context.MODE_PRIVATE, null);
   for(int index=0;index<tableNames.length;index++){//Then do the same for the for the tables and their respective fields
    database.execSQL("CREATE TABLE IF NOT EXISTS "+tableNames[index]+"(id INT PRIMARY KEY ASC, "+tableFields[index]+");");
   }//Catch any errors
  }catch (SQLException e){Log.e(this.getClass().toString(), "Error while checking db");}
 }
 
 //Fetch elements from the (local) database
 public static Cursor getResults(String tableName, String[] columns, String conditions){
  //First we want to get the count of results that match our conditions, this is so we avoid a potential CursorIndexOutOfBoundsException
  Cursor cursor=database.rawQuery("SELECT count(*) FROM "+tableName+(conditions!=null?" WHERE "+conditions:""), null);
  cursor.moveToFirst();//get to the result
  if(cursor.getInt(0)>0){//See that there is more than one result matching the conditions returned from the table
   cursor=database.query(tableName, columns, conditions, null, null, null, null);
   cursor.moveToFirst();//get to the first result to avoid having to do this after recieving the returned cursor(and to get to the first result to check that it isn't null)
   if(!cursor.isNull(0)){return cursor;}//So if the result isn't null, return it
  }
  cursor.close();//free up memory
  return null;
 }
 
 //Insert an element into the database
 public static void insert(String tableName,String[] columnNames,String[] columnValues){
  ContentValues values=new ContentValues();//ContentValues is the Object type requred to submit values
  for(int index=0;index<columnNames.length;index++){//Step through the two String arrays and add them to
   values.put(columnNames[index], columnValues[index]);
  }
  database.insert(tableName, null, values);//Then submit it to the database
 }
 
 //Editing uses the exact same steps as inserting except, instead of calling insert it calls update(and requires conditions)
 public static void edit(String tableName,String[] columnNames,String[] columnValues,String conditions){
  ContentValues values = new ContentValues();
  for(int index=0;index<columnNames.length;index++){values.put(columnNames[index], columnValues[index]);}
  database.update(tableName, values, conditions, null);
 }
}