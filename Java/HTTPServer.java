import java.net.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.io.*;
import java.text.SimpleDateFormat;
import java.util.*;
public class HttpServer {
 static Map<String, String> fileType=new HashMap<String,String>();
 
 static String root;
 static int port=2473;
 public static Boolean running;
  public static HashMap<String,UserSession> Sessions=new HashMap<String,UserSession>();

 public static void main(String args[]) throws URISyntaxException{
  root = new File(HttpServer.class.getProtectionDomain().getCodeSource().getLocation().toURI().getPath()).getParentFile().getAbsolutePath();
  //Add the different MIME Types corresponding to file extensions to a HashTable so it is easy to retrieve when the client asks for a file
  fileType.put("htm","text/html");
  fileType.put("html","text/html");
  fileType.put("jpg","image/jpg");
  fileType.put("jpeg","image/jpg");
  fileType.put("jpe","image/jpg");
  fileType.put("png","image/png");
  fileType.put("gif","image/gif");
  fileType.put("au","audio/basic");
  fileType.put("snd","audio/basic");
  fileType.put("wav","audio/x-wave");
  fileType.put("mp3","audio/mpeg3");
  fileType.put("mp4","audio/mp4");
  fileType.put("m4a","audio/mp4");
  fileType.put("midi","audio/midi");
  fileType.put("avi","video/mpeg");
  fileType.put("mpg","video/mpeg");
  fileType.put("mpeg","video/mpeg");
  fileType.put("mpe","video/mpeg");
  fileType.put("qt","video/quicktime");
  fileType.put("mov","video/quicktime");
  fileType.put("class","application/octet-stream");
  fileType.put("txt","text/plain");
  runServer();
 }
 public static void runServer(){
  try {
   running=true;
   ECHO(Level.INFO,"web server starting");
   Interface.Notify("BirdsQuest","Server has started");
      ServerSocket ss = new ServerSocket(port);//Listen on port 2473(BIRD) for a connection to find the first free port
      while(running){//Don't stop unless an error is hit or the server is set to stop running
       Socket client = ss.accept();//Accept any new sockets
       HttpServerSession thread = new HttpServerSession(client);//Make them a new thread to communicate
       thread.start();
  } } catch(Exception e){System.err.println("Exception: " + e);e.printStackTrace();}
 }
 public static void stopServer(){running=false;}
}

class HttpServerSession extends Thread{
    Socket client;
    File file;
 InputStream is;//If the file to send is internal to the jar
 FileInputStream fis;//If the file to sent is external to the jar
 Boolean internalFIS=false;//The boolean to declare which stream to use
 Boolean fisIsFile=true;//If false, what we're sending is not a file but data generated from the program
 String header,//A string to temporarity store the incoming header
  filename, content;
 int rangeStart=0, rangeEnd=-1, fileLength;
 Date lastModified;
 String header;
 HashMap<String,String> request=new HashMap<String,String>();

    public void run(){
     try{
      //Initialise the BufferedReader to get the header info that the client sent
      BufferedReader reader = new BufferedReader(new InputStreamReader(client.getInputStream()));
   HashMap<String,String> vars=new HashMap<String,String>();
      
      //Get the headers first line and make sure it's not blank
      header=reader.readLine();
   if(header==null){
    System.out.println("The request header is null");
    client.close();
    System.out.println("The client is closed");
    return;
   }
   request.put("Request",header);//Throw it into the request
   String parts[] = request.get("Request").split(" "); //Break it into the three parts that make it up; Request Type, Filename and HTTP Version
   if(parts.length==3){             //Make sure it breaks up properly and make sure it is a get request

    String method=parts[0]; //Is a POST or a GET
    String filename=parts[1];   //Get the filename being requested
   
    String[] headLine=new String[0]; //A temporary String array used to split Strings
    //Go through each line and add it to the request HashMap
    while(!(header=reader.readLine()).equals("")){//Read each line until the end of the header, signified by an empty line. After which is the content.
     headLine=header.split(": ");
     request.put(headLine[0],headLine[1]);
    }
   
    //Get the vars from the content if it is a POST request
    if(method.compareTo("POST")==0){
     char[] postContent=new char[Integer.parseInt(request.get("Content-Length"))];//Content-Length is the size of the entity-body in decimal number of OCTETs
     reader.read(postContent);//reads Content-Length worth of bytes from the recieved content
     header=new String(postContent);//Convert the char array into a String which is all of the POST variables
     headLine=header.split("&");//Divide the post variables into individual entries
     if(headLine[0].indexOf("=")!=-1){//Make sure that these are variables as opposed to other content(they need to equal something)
      for(int index=0;index<headLine.length;index++){//Go through each variable, split on '=' and add to the vars HashMap in the same
       parts=headLine[index].split("=");
       vars.put(parts[0],parts[1]);
    } } }
    //Get the vars from the filename if it is a GET request
    else if(method.compareTo("GET")==0&&filename.indexOf("?")!=-1){
     headLine=filename.split("\?");//Split the filename on the ?
     filename=headLine[0];//Anything before the ? is the filename
     headLine=headLine[1].split("&");//Anything after is the variables, so split them up on the &
     for(int index=0;index<headLine.length;index++){//Go through each variable, split on '=' and add to the vars HashMap in the same
      parts=headLine[index].split("=");
      vars.put(parts[0],parts[1]);
    } }
    
    //Get the requested ranges (the starting and ending point of bytes) of the file to send
    if((header=request.get("Range"))!=null){//If the range is set
     headLine=header.replaceFirst(" bytes=","").split("-");//Then get the range of bytes, split into a String array
     rangeStart=Integer.parseInt(headLine[0]);//The first element of the array is the starting point of the range
     if(headLine.length>1){rangeEnd=Integer.parseInt(headLine[1]);}//If the second is set, thats the end of the range
    }

    HandleRequest(vars);//Decide what to do with the request given(fetch a file or handle it internally)
     
    if(fisIsFile){
     if(!internalFIS){lastModified=new Date(file.lastModified());}
     else{lastModified=new Date(HttpServer.class.getResource(filename).openConnection().getLastModified());}
     fileLength=internalFIS?is.available():Math.toIntExact(file.length());
    }
    
    if(fisIsFile&&rangeEnd==-1){rangeEnd=fileLength;}
    if(fileLength>(rangeEnd-rangeStart)){header="HTTP/1.1 206 Partial Content";}
     
    PrintHeadersAndContent();
   } 
   client.close();
   System.out.println("The client is closed");
     }
  catch(Exception e) {HttpServer.STACKTRACE("Exception on HttpServer.run(): ", e);}
    }
 
 private void HandleRequest(HashMap<String,String> vars){
    String folder="";
    header="HTTP/1.1 200 OK";
  try{//Check that the file exists and read it in, set the status code to 200 to show that it worked
   if(filename.matches("/")){//If one isn't set, default to the index
    filename="/index.html";
    internalFIS=true;
    is=HttpServer.class.getResourceAsStream(filename);//The index is stored inside the jar, fetch from there
   }
   //if the requested filename ends with /$ then it's a command that will be handled internally
   //eg. http://localhost/$ with POST variables, the with "cmd" being the switch variable
   else if(filename.endsWith("/$")){
    filename=(URLDecoder.decode(vars.get("cmd"))).replaceAll("/%20"," ");//Get the cmd and convert the String back from being http friendly
    switch(filename){
     //e is for editor, so eOpen/eNew/eSave are for editing html files using the file editor(html contenteditable=true)
     case "eOpen":
      content=Editor.Opener(vars);
      System.out.println(content);
     break;
     case "eNew": content=Editor.New(vars); break;
     case "eSave": content=Editor.Save(vars); break;
     
     //Task is a n-ary tree style todo list stored in a local database
     //the following is add/remove/load/edit/open/complete
     case "aTask": content=Task.add(vars,userID); break;
     case "rTask": content=Task.remove(vars,userID); break;
     case "lTask": content=Task.load(vars,userID); break;
     case "eTask": content=Task.edit(vars,userID); break;
     case "oTask": content=Task.toggleOpen(vars,userID); break;//Expand/collpase an entries children
     case "cTask": content=Task.toggleComplete(vars,userID); break;
     //int accesses the "internal file system" meaning it accesses a file from the jar(like index)
     case "int":
      internalFIS=true;
      filename="/"+vars.get("file");
      is=HttpServer.class.getResourceAsStream(filename);
      return;
     default: //Otherwise, check the local filesystem(external) for the supplied file. One might do this if they want the filename obscured by POST
      file=new File(HttpServer.root+"/"+filename);
      System.out.println(HttpServer.root+"/"+filename);
      fis=new FileInputStream(file);
      return;
    }
    //If it was a file(internal or external), notice that the function was returned in the switch statement
    fileLength=content.length();//So that means that the length is however long the content String is
    lastModified=new Date();//And it was last modified at the current datetime
    fisIsFile=false;    //And the "input stream"(not really) is not a file
   }
   //Otherwise, it's not the index and it's not a command. So it must be a file from the file system
     else{
    filename=URLDecoder.decode(filename);
    folder=URLDecoder.decode(folder);
    file=new File(HttpServer.root+folder+filename);
    fis=new FileInputStream(file);
   }
    }
  //If it reaches the catch statement, it tried to fetch from the file system but the file didn't exist
  catch(Exception e){
   if((file=new File(HttpServer.root+filename)).exists()){//So check if it's a folder, if it is then return a browsable folder structure
    content=listFilesForFolder(filename,vars);
    lastModified=new Date(file.lastModified());
    fileLength=content.length();
    filename+=".html";
    fisIsFile=false;
   }else{//If it doesn't give the 404 page and start the header with the appropriate status code
    internalFIS=true;
    filename="/pagenotfound.html";
    is=HttpServer.class.getResourceAsStream(filename);
    header="HTTP/1.1 404 Not Found";
    HttpServer.STACKTRACE("Exception on HttpServerSession.HandleRequest(): ", e,false);
   } } }
 
 private void PrintHeadersAndContent(String filename) throws IOException{
  BufferedOutputStream writer=new BufferedOutputStream(client.getOutputStream());//BufferedOutputStream to send to the client
  //Write the header information
  System.out.println("----Start Response Header----");
    println(writer,header);
    println(writer,"Date: "+convertTime(Calendar.getInstance().getTime()));//get the current server time
    println(writer,"Server: BirdsQuest");//Just being honest
    println(writer,"Last-Modified: "+convertTime(lastModified));//(fisIsFile?new Date(file.lastModified()):new Date()));//get the last modified
    println(writer,"ETag: \""+filename+"\"");//I should randomise this, but I couldn't be bothered and it wasn't in the scope of the assignment
    println(writer,"Accept-Ranges: bytes");
    println(writer,"Content-Range: bytes "+rangeStart+"-"+(rangeEnd-1)+"/"+fileLength);
  System.out.println(rangeEnd+"-"+rangeStart+"="+(rangeEnd-rangeStart));
    println(writer,"Content-Length: "+(rangeEnd-rangeStart));//(fisIsFile?(internalFIS?is.available():fis.available())));
    //This is where we tell the client what type the file is, from our HashMap we declared at the beginning
    println(writer,"Content-Type: "+HttpServer.fileType.get(filename.substring(filename.lastIndexOf(".") + 1).toLowerCase()));
    println(writer,"Connection:"+((header=request.get("Connection"))!=null?header:" close"));//Make sure the client closes the connection
    if(header!=null){println(writer,"Keep-Alive:timeout=5, max=100");}
  println(writer,"");//A blank line signals that the header is over and that the content is starting
  
  //Then send the content
  if(fisIsFile){printF(writer,internalFIS?is:fis,rangeStart,rangeEnd);}//Print the file
  else{println(writer,content);}//Print the file
  //Flush the BufferedOutputStream to make sure everything has gone through before we close the connection
  writer.flush();
 }
 
 //Send the file to the stream
 private void printF(BufferedOutputStream bos, InputStream is, int start, int end) throws IOException {
  int b;
  for(long i = 0; i < start; i++) {
   b = is.read();
  }
  for(long i = start; i < end&&(b = is.read())!=-1; i++) {
  bos.write(b);
  }
 }
  
 //For printing the header(or other plain text)
 private void println(BufferedOutputStream bos, String s) throws IOException {
  String news = s + "
";//Add the compliant newline
  //System.out.print(" "+news);//Throw it in the server terminal so we know what's being sent
  byte[] array = news.getBytes();//Convert to bytes cause that's what BufferedOutputStream likes
  for(int i=0; i<array.length; i++){bos.write(array[i]);}//Print byte by byte
  return;
 }
  
 //Convert time stamp to Http compliant standard
  String convertTime(Date time) {
      SimpleDateFormat dateFormat = new SimpleDateFormat("EEE, dd MMM yyyy HH:mm:ss z", Locale.US);
      dateFormat.setTimeZone(TimeZone.getTimeZone("GMT"));
     return dateFormat.format(time);
  }
 
 //For browsing the folder structure
 public static String listFilesForFolder(String path,HashMap<String,String> vars) {
  path=URLDecoder.decode(HttpServer.root+path);
  final File folder = new File(path);
  String dir=path+"/";
  String folders="";
  String files="";
  for(final File fileEntry : folder.listFiles()){
   if(fileEntry.isDirectory()){
    folders+="<span onclick='window.location=\""+dir+fileEntry.getName()+"\"'><b>"+fileEntry.getName()+"</b></span><br>";
   }else{
    files+="<span onclick='window.location=\""+dir+fileEntry.getName()+"\"'>"+fileEntry.getName()+"</span><br>";
  } }
  files=folders+files;
  if(files.equals("")){files="The Folder Is Empty";}
  return files;
 }
 
  //Construct the Thread
  public HttpServerSession(Socket s){client = s;System.out.println("a connection is made");}
}

class UserSession{
 public int userID;
 public String cookieID;
 public static int timeSpan;
 public Date expires;
}

class Editor{
 //For browsing the file structure to open new files
 public static String Opener(HashMap<String,String> vars){
  String folders="", files="",
  path=(URLDecoder.decode(vars.get("path"))).replaceAll("%20"," ");//The provided directory path to open
  final File folder=new File(HttpServer.root+"/"+path);//The folder to open
  path+="/";//Add the slash for the visual representation of the used path
  
  //Go through each file(and folder) in the directory and add them to their respective strings
  for(final File fileEntry:folder.listFiles()){//Files/Folders are delimited by new lines
   if(fileEntry.isDirectory()){//Folder strings are prefixed by a pipe (|) to diffentiate them from files in the return string
    folders+="|"+fileEntry.getName()+"
";
   }else{files+=fileEntry.getName()+"
";}
  }
  files=folders+files;//Join the list
  if(files.equals("")){files="The Folder Is Empty";}//Set the string in the case of an empty folder
  return dir+"
"+files;//Then return
 }
 
 //Create a new file
 public static String New(HashMap<String,String> vars){
  try{
   String filename=(HttpServer.root+"\"+URLDecoder.decode(vars.get("dir"))+vars.get("name"));//Where to save the file
   File file=new File(filename.replaceAll("%20"," "));//Create a new file(setting the filename back to html unfriendly)

   if(vars.get("type").equals("folder")){//Make a folder if it's a folder
    file.mkdir();
   }else{//Or make it a file it's a file;
    file.createNewFile();
   }
  }catch(IOException e){HttpServer.STACKTRACE("Exception on HttpServer.EditorNewFile(): ", e);}
  return (vars.get("dir")+vars.get("name")).replaceAll("%20"," ");//Return the new files location/name
 }
 
 //Save any changes to a file
 public static String Save(HashMap<String,String> vars){
  try{
   String file=URLDecoder.decode(vars.get("file"),"UTF-8");//Get the filename to overwrite
   file=HttpServer.root+"\"+file.replaceAll("%20"," ");//And then append an html unfriendly version of the filename to the server root
   file=file.replace("/","\");//And make it slightly more html unfriendly(but true to a filepath)

   try(PrintWriter out=new PrintWriter(file)){//Make the print writer
    out.println(URLDecoder.decode(vars.get("content"),"UTF-8"));//Print the content of the edited file
   }catch(IOException e){HttpServer.STACKTRACE("Exception on HttpServer.EditorSaveFile(): ", e);}
  }catch(IOException e){HttpServer.STACKTRACE("Exception on HttpServer.EditorSaveFile(): ", e);}
  return vars.get("dir")+vars.get("name");//Return the new files location/name
 }
}

class Task{
 public long id,userID;
 public String name;
 public long child;
 public long sibling;
 public long parent;
 public Boolean open;
 public Boolean complete;
 public Boolean daily;
  
 //========================Loading functions
 //Fetch a single task from the Database
 public static Task get(long id, long userID){
  if(id!=-1){//If it is not the root node
   try{//Then try fetch it from the Databse and return it
    return new Task(Database.select("Tasks", new String[]{"id","name","child","sibling","parent","open","complete","daily","userID"}, "id='"+ Long.toString(id)+"' AND userID='"+Long.toString(userID)+"'").get(0));
   }catch(SQLException e){HttpServer.STACKTRACE("Exception on Task.get(): ", e);}
  }
 return null;
 }
 //Fetch a task branch from the Database
 public static String load(HashMap<String,String> vars,long userID){
  Task node=get(getStart(userID),userID);//First, get the base/parent task(this doesn't get sent back)
  String nodes="";
  while(node!=null&&nextNode(node)!=null){//While the node exists and there is another node coming
   node=nextNode(node);//Set the node to the next node
   //And add it to the output string
   nodes+=(node.open?"+":"-")+(node.complete?"c":"n")+node.id+"~!"+node.name+"~!"+node.child+"~!"+node.sibling+"~`";
  }
  return nodes;
  //As an example
  //return "1~!First~!3~!4~`2~!Second~!6~!-1~`3~!Third~!-1~!5~`4~!Fourth~!-1~!2~`5~!Fifth~!9~!-1~`6~!Sixth~!-1~!7~`7~!Seventh~!-1~!8~`8~!Eigth~!-1~!-1~`9~!Ninth~!10~!-1~`10~!Tenth~!-1~!11~`11~!Eleventh~!-1~!-1";
 }
 //Get the next node of a task, whether it's a sibling or child
 public static Task nextNode(Task node){
  if(node.child!=-1){node=get(node.child,node.userID);} //If it has a child, that is the next node
  else if(node.sibling!=-1){node=get(node.sibling,node.userID);}  //If it has a sibling, that is the next node
  else{             //Otherwise, it's the last child in a branch
   Task parentNode=node;        //So, get its parent
   if(parentNode.parent==-1){return parentNode;}//If the parent is in the root, just return that
   while(get(parentNode.parent,parentNode.userID).parent!=-1){//Otherwise loop until we have a parent
    parentNode=get(parentNode.parent,parentNode.userID);
    if(parentNode.sibling!=-1){break;}   //It has a sibling now, so break there
   }
   node=get(parentNode.sibling,parentNode.userID);//node becomes that sibling
  }
  return node;
 }
 //Get the older sibling by getting the parent and tracing back down to the previous sibling
 public Task olderSibling(){
  Task node=get(get(this.parent,this.userID).child,this.userID);//Get the first child of this tasks parent
  if(node==this){return node;}//If this node is the first child of the parent, then return it
  while(node.sibling!=this.id){node=get(node.sibling,node.userID);}//Other wise, iterate until the tasks sibling is this task
  return node;
 }
 //Recursivly make your way to a nodes last sibling
 public static Task traverseSiblings(Task node,long userID){
  if(node.sibling!=-1){node=traverseSiblings(get(node.sibling,userID),userID);}//While there's a sibling to go to, go there
  return node;
 }

 //========================Adding Functions
 //Add a new task to the Database
 public static String add(HashMap<String,String> vars,long userID){
  long id=-1;
  String parentID=vars.get("parent").compareTo("0")==0?Long.toString(getStart(userID)):vars.get("parent");
  try{
   String name=URLDecoder.decode(vars.get("name"),"UTF-8").replaceAll("%20"," ");//Convert name back from HTTP friendly name
   //Add a new task to Database, inserting returns the id
   id=Database.insert("Tasks",new String[]{"name","child","sibling","parent","open","complete","daily","userID"},
     new String[]{name,"-1","-1",parentID,"false","false","false",Long.toString(userID)});
     
   Task node=get(Long.parseLong(parentID),userID);   //Get the parent node and make sure it's open
   Database.edit("Tasks",new String[]{"open"}, new String[]{"true"}, "id='"+node.id+"' AND userID='"+userID+"'");
   if(node.child!=-1){//If the parent already has a child, then put the node as the youngest child
    Database.edit("Tasks",new String[]{"sibling"}, new String[]{Long.toString(id)}, "id='"+traverseSiblings(get(node.child,userID),userID).id+"'");
   }else{Database.edit("Tasks",new String[]{"child"}, new String[]{Long.toString(id)}, "id='"+node.id+"'");}//Otherwise it becomes the parents oldest child
  }catch(SQLException|IOException e){HttpServer.STACKTRACE("Exception on Task.add(): ", e);}

  return Long.toString(id);
 }
 //Create a new root node/task in case the user doesn't have one
 public static long newStart(long userID){
  try{return Database.insert("Tasks",new String[]{"name","child","sibling","parent","open","complete","daily","userID"},
            new String[]{"Tasks","-1","-1","-1","true","false","false",Long.toString(userID)});
  }catch(SQLException e){HttpServer.STACKTRACE("Exception on Task.newStart(): ", e);}
  catch(Exception e){HttpServer.STACKTRACE("Exception on Task.newStart(): ", e);}
  return -1;
 }
 
 //========================Editing Functions
 //Edit a tasks name
 public static String edit(HashMap<String,String> vars,long userID){
  try{
   String name=URLDecoder.decode(vars.get("name"),"UTF-8").replaceAll("%20"," ");//Convert name back from HTTP friendly name
   Database.edit("Tasks",new String[]{"name"},new String[]{name},"id='"+vars.get("id")+"' AND userID='"+userID+"'");//Edit
   return "Success";
  }catch(SQLException|IOException e){HttpServer.STACKTRACE("Exception on Task.edit(): ", e);}
  return "Failure";
 }
 //Open/close a branch(for visible display)
 public static String toggleOpen(HashMap<String,String> vars,long userID){
  try{
   Task node=get(Long.parseLong(vars.get("id")),userID);//Get the task from the id(to get its open status)
   Database.edit("Tasks",new String[]{"open"}, new String[]{String.valueOf(!node.open)}, "id='"+node.id+"' AND userID='"+userID+"'");//toggle its open variable
   return "Success";
  }catch(SQLException e){HttpServer.STACKTRACE("Exception on Task.toggleOpen(): ", e);}
  return "Failure";
 }
 //Toggle a tasks complete status
 public static String toggleComplete(HashMap<String,String> vars,long userID){
  try{
   Task node=get(Long.parseLong(vars.get("id")),userID);//Get the task from the id(to get its complete status)
   Database.edit("Tasks",new String[]{"complete"}, new String[]{String.valueOf(!node.complete)}, "id='"+node.id+"' AND userID='"+userID+"'");//toggle its complete variable
   return "Success";
  }catch(SQLException e){HttpServer.STACKTRACE("Exception on Task.toggleOpen(): ", e);}
  return "Failure";
 }

 //========================Deleting Functions
 //Delete a task and reconnect the surrounding tasks
 public static String remove(HashMap<String,String> vars,long userID){
  try{
   Task node=get(Long.parseLong(vars.get("id")),userID);  //Get the node from the id
   Task previous=get(Long.parseLong(vars.get("previous")),userID); //

   if(previous.id==node.id){
    Database.edit("Tasks",new String[]{"child"}, new String[]{Long.toString(node.sibling)}, "id='"+Long.toString(node.parent)+"'");
   }//If the node being deleted is the first node
   if(previous.child==node.id){
    Database.edit("Tasks",new String[]{"child"}, new String[]{Long.toString(node.sibling)}, "id='"+Long.toString(previous.id)+"'");
   }
   else{
    if(previous.sibling!=node.id){previous=previous.olderSibling();}
    Database.edit("Tasks",new String[]{"sibling"}, new String[]{Long.toString(node.sibling)}, "id='"+Long.toString(previous.id)+"'");
   }
   if(node.child!=-1){removeDecendants(get(node.child,userID),userID);}
   Database.delete("Tasks","id='"+vars.get("id")+"' AND userID='"+userID+"'");
   return "Success";
  }catch(SQLException e){HttpServer.STACKTRACE("Exception on Task.edit(): ", e);}
  return "Failure";
 }
 //Delete any younger siblings or children(or children of younger siblings)/the remainder of a branch
 public static void removeDecendants(Task node,long userID){
  if(node.child!=-1){removeDecendants(get(node.child,userID),userID);}//First go through any children to recursively delete them
  if(node.sibling!=-1){removeDecendants(get(node.sibling,userID),userID);}//Then check its siblings
  try{//Then actually remove from the database
   Database.delete("Tasks","id='"+Long.toString(node.id)+"' AND userID='"+userID+"'");
  }catch(SQLException e){HttpServer.STACKTRACE("Exception on Task.edit(): ", e);}
 }
 
 //========================Misc Functions
 //Construct the task from a string array
 public Task(String[] task){
  this.id=Long.parseLong(task[0]);
  this.name=task[1];
  this.child=Long.parseLong(task[2]);
  this.sibling=Long.parseLong(task[3]);
  this.parent=Long.parseLong(task[4]);
  this.open=Boolean.parseBoolean(task[5]);
  this.complete=Boolean.parseBoolean(task[6]);
  this.daily=Boolean.parseBoolean(task[7]);
  this.userID=Long.parseLong(task[8]);
 }
 //Convert to a human readable string
 public String toString(){
  return "id: "+Long.toString(this.id)+
  ", name: "+this.name+
  ", child: "+Long.toString(this.child)+
  ", sibling: "+Long.toString(this.sibling)+
  ", parent: "+Long.toString(this.parent)+
  ", open: "+Boolean.toString(this.open)+
  ", complete: "+Boolean.toString(this.complete)+
  ", daily: "+Boolean.toString(this.daily);
 }
}

/*Database Examples
   select//ArrayList<String[]> result=Database.select("tableName", new String[]{"id","name"}, "id='"+ Long.toString(id)+"'");
   insert//long id=Database.insert("tableName",new String[]{"field"},new String[]{"info"});//Add a new task to array
   edit//Boolean success=Database.edit("tableName",new String[]{"field"}, new String[]{"info"}, "id='"+traverseSiblings(Task.get(node.child)).id+"'");
 */
class Database {
 private static final String DB_DRIVER="org.h2.Driver";
 private static final String DB_CONNECTION="jdbc:h2:./lutData";
 private static final String DB_USER="";
 private static final String DB_PASSWORD="";
 public static final String[] divider=new String[]{"~!","~#","~`","~*"};

 //Getting a connection to the database
 private static Connection getDBConnection() {
  try{Class.forName(DB_DRIVER);}//Check if the driver exists as a class
  catch(ClassNotFoundException e){HttpServer.STACKTRACE("Exception on Database.getDBConnection(): ", e);}
  try{//creare the connection
   Connection dbConnection=DriverManager.getConnection(DB_CONNECTION, DB_USER, DB_PASSWORD);
   connection.setAutoCommit(false);//To save from committing every statement
   return dbConnection;
  }catch(SQLException e){HttpServer.STACKTRACE("Exception on Database.getDBConnection(): ", e);}
  return null;
 }
 
 
 public static long insert(String tableName, String[] fields, String[] value) throws SQLException {
  Connection connection = getDBConnection();//Get the db connection
  try{
   String valueCount="";
   for(int index=0;index<value.length;index++){valueCount+="?,";}
   valueCount = valueCount.substring(0, valueCount.length());//remove the last comma
   PreparedStatement insert=connection.prepareStatement("INSERT INTO "+tableName+"("+String.join(", ",fields)+") values("+valueCount+")", Statement.RETURN_GENERATED_KEYS);

   //Get the column types of the given fields
   int[] type=new int[fields.length];
   DatabaseMetaData metadata = connection.getMetaData();
   for(int index=0;index<fields.length;index++){
    ResultSet resultSet = metadata.getColumns(null, null, tableName.toUpperCase(), fields[index].toUpperCase());
    if(resultSet.next()){type[index]=resultSet.getInt("DATA_TYPE");}
   }
   
   //Then set each of the insert values based on the column types given
   for(int index=0;index<value.length;index++){
    switch(type[index]){
     case Types.BOOLEAN: insert.setBoolean(index+1, Boolean.parseBoolean(value[index]));break;
     case Types.DOUBLE: insert.setDouble(index+1, Double.parseDouble(value[index]));break;
     case Types.FLOAT: insert.setFloat(index+1, Float.parseFloat(value[index]));break;
     case Types.DATE: insert.setDate(index+1, java.sql.Date.valueOf((value[index])));break;//yyyy-MM-dd
     case Types.INTEGER: insert.setInt(index+1, Integer.parseInt(value[index]));break;
     case Types.VARCHAR: insert.setString(index+1, value[index]);break;
     case Types.TIME: insert.setTime(index+1, java.sql.Time.valueOf((value[index])));break; 
     case Types.TIMESTAMP: insert.setTimestamp(index+1, java.sql.Timestamp.valueOf((value[index])));break;
     default: insert.setNull(index+1,Integer.parseInt(value[index]));break;
   } }
   insert.executeUpdate();//Sent the insert statement   
   ResultSet rsKeys = insert.getGeneratedKeys();//Get the new keys
   
   //Wrap up the lose ends
   insert.close();
   connection.commit();
   
   //Then get the auto incrementing id from the newly inserted row
   if(rsKeys.next()){id=rsKeys.getLong(1);}
  }
  catch(SQLException e){e.printStackTrace();HttpServer.STACKTRACE("Exception on Database.insert(): ", e);}
  catch(Exception e){HttpServer.STACKTRACE("Exception on Database.insert(): ", e);}
  finally{connection.close();}
  return -1;
 }
 
 //Returns an ArrayList<String[]> of each entry in the ArrayList is a unique result of the database where every String[] contains the individual fields
 public static ArrayList<String[]> select(String tableName, String[] fields, String condition) throws SQLException {
  Connection connection = getDBConnection();
  ArrayList<String[]> Results=new ArrayList<>();
  if(fields.length==0){fields=new String[]{"ALL"};}
  try{//Make the statement
   PreparedStatement selectPreparedStatement = connection.prepareStatement("SELECT "+String.join(", ", fields)+" from "+tableName+(condition!=null?" WHERE "+Condition:"")+";");
   ResultSet rs = selectPreparedStatement.executeQuery();//get the results of the statement
   
   ResultSetMetaData rsmd = rs.getMetaData();//Get the  metadata, so we know what the data types we've just recieved are

   while(rs.next()){//go through each result
    String[] Result=new String[fields.length];//Build an empty String array to store your results
    for(int index=0;index<fields.length;index++){//Fog each field, convert its type for the String array
     switch(rsmd.getColumnType(index+1)){
      case Types.ROWID: Result[index]=String.valueOf(rs.getInt(fields[index]));break;
      case Types.BOOLEAN: Result[index]=String.valueOf(rs.getBoolean(fields[index]));break;
      case Types.DOUBLE: Result[index]=String.valueOf(rs.getDouble(fields[index]));break;
      case Types.FLOAT: Result[index]=String.valueOf(rs.getFloat(fields[index]));break;
      case Types.DATE: Result[index]=(new SimpleDateFormat("MM/dd/yyyy")).format(rs.getDate(fields[index]));break;//yyyy-MM-dd
      case Types.INTEGER: Result[index]=String.valueOf(rs.getInt(fields[index]));break;
      case Types.VARCHAR: Result[index]=rs.getString(fields[index]);break;//String
      case Types.TIME: Result[index]=(new SimpleDateFormat("MM/dd/yyyy")).format(rs.getTime(fields[index]));break; 
      case Types.TIMESTAMP: Result[index]=(new SimpleDateFormat("MM/dd/yyyy")).format(rs.getTimestamp(fields[index]));break;
      default: Result[index]=rs.getString(fields[index]);break;
    } }
    Results.add(Result);//Then push the array onto the ArrayList to return
   }
   //Close up the open connections
   selectPreparedStatement.close();
   connection.commit();
  }
  catch(SQLException e){HttpServer.STACKTRACE("Exception on Database.select(): ", e);}
  catch(Exception e){HttpServer.STACKTRACE("Exception on Database.select(): ", e);}
  finally{connection.close();}
  return Results;
 }
 
 public static Boolean edit(String tableName, String[] fields, String[] Value, String conditions) throws SQLException{
  Connection connection = getDBConnection();
  try{
   String update="UPDATE "+tableName+" SET ";//Begin the query string
   for(int index=0;index<fields.length;index++){//Build the setters of the query string
    update+=fields[index]+" = '"+Value[index]+"',";
   }
   update=update.substring(0, update.length()-1);//remove the last comma
   update+=" WHERE "+conditions;//Add the where clause
   //Then just make, execute and close the statement
   PreparedStatement create = connection.prepareStatement(update);
   create.executeUpdate();
   create.close();
   connection.commit();
   return true;
  }catch(SQLException e){HttpServer.STACKTRACE("Exception on Database.deleteTable(): ", e);}
  catch(Exception e){HttpServer.STACKTRACE("Exception on Database.deleteTable(): ", e);}
  finally{connection.close();}
  return false;
 }
 
 public static Boolean delete(String tableName, String conditions) throws SQLException{
  Connection connection = getDBConnection();
  try{
   //Just make, execute and close off the statement
   PreparedStatement create = connection.prepareStatement("DELETE FROM "+tableName+" WHERE "+conditions);
   create.executeUpdate();
   create.close();
   connection.commit();
   return true;
  }catch(SQLException e){HttpServer.STACKTRACE("Exception on Database.deleteTable(): ", e);}
  catch(Exception e){HttpServer.STACKTRACE("Exception on Database.deleteTable(): ", e);}
  finally{connection.close();}
  return false;
 }
 
 //Creates a new table(if it doesn't exist)
 public static void createTable(String tableName, String fields) throws SQLException {
  Connection connection = getDBConnection();//Get the db connection
  try{
   //Need to check if table already exists
   DatabaseMetaData meta=connection.getMetaData();//get the metadata of the table
   ResultSet rs = meta.getTables(null, null, tableName.toUpperCase(), new String[] {"TABLE"});//And search for the table name
   if(rs.next()){System.out.println("The table "+tableName+" already exists");}//rs.next() calls the first result, if there is one then the table exists.
   else{//if there isn't any then it's null and we can create the table
    //Precompile the statement to create the database
    PreparedStatement create = connection.prepareStatement("CREATE TABLE "+tableName+"(id int primary key auto_increment, "+fields+")");
    create.executeUpdate();//Exute the statement
    create.close(); //Release this Statement object's database and JDBC resources
    connection.commit();//Then save the changes
    
  } }
  catch(SQLException e){HttpServer.STACKTRACE("Exception on Database.CreateTable(): ", e);}
  catch(Exception e){HttpServer.STACKTRACE("Exception on Database.CreateTable(): ", e);}
  finally{connection.close();}
 }
 
 public static void deleteTable(String tableName) throws SQLException{
  Connection connection = getDBConnection();
  try{
   PreparedStatement create = connection.prepareStatement("DROP TABLE "+tableName);
   create.executeUpdate();
   create.close();
   connection.commit();
  }catch(SQLException e){HttpServer.STACKTRACE("Exception on Database.deleteTable(): ", e);}
  catch(Exception e){HttpServer.STACKTRACE("Exception on Database.deleteTable(): ", e);}
  finally{connection.close();}
 }
}