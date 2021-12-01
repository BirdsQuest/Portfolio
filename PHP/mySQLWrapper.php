<?php require_once($_SERVER['DOCUMENT_ROOT']."/core/settings.php");
 class DB{
  public static $table;
  public static $heldTable;
  private static $conn;
  private static $dict='mrjoc0ksfew1tvqui2zphdl3ynxba4gMRJO5CKSFE6WTVQU7IZPHD8LYNXB9AG';

  public static function init($address, $user, $password){
   DB::$conn=mysqli_connect($address, $user, $password) or DB::error();
   DB::$table=DB::tableDetails();
  }
  public static function connect($DBName){
   mysqli_select_db(DB::$conn,"randetja_".$DBName) or die(mysqli_error(DB::$conn));
   //TODO: UNCOMMENT THE FOLLOWING AND FIX IT
   //if($_SERVER['REQUEST_METHOD']!="POST"&&!isset($Get)){error("Unauthorized attempt to access page.");}
   //change character set to utf8
   if(!DB::$conn->set_charset("utf8")){}//message::e("Error loading character set utf8: ".DB::$conn->error);
   else{}//message::i("Current character set: ".DB::$conn->character_set_name());
  }
  public static function tableDetails(){
   if(isset($_POST["CAT1"])){
    $tableID=$_POST["CAT1"];
    unset($_POST["CAT1"]);
   }else{
    $tableID=$_SERVER['HTTP_REFERER'];
    $tableID=explode("/",$tableID);
    $tableID=array_splice($tableID,2);
    $tableID=join("/",$tableID);
    $tableID=$_POST["CAT1"];
   }
   if($tableID!=null){
    DB::connect("Site");
    if(($table=DB::selectSingleFrom("tablesList",array("referer"=>$tableID)))!=false){
     DB::connect($table["dbName"]);
     return $table;
    }
    //blinmessage::e("Failed to retrieve table details");
  } }

  private static function query($query){
   //message::d($query);
   $response=mysqli_query(DB::$conn,$query) or DB::error($query);
   return $response;
  }
  private static function conditions($query,$conditions){
   if(isset($conditions)&&sizeof($conditions)>0){
    //$conditions=DB::decodeID($conditions,1);
    $query.=" WHERE ";
    //var_dump($conditions);
    //message::I("_query: ".$query);
    //message::I("_conditions: ".var_export($conditions,true));
    //if($conditions["referer"]!="PAGES" &&$conditions["referer"]!="CAT1" && $conditions["name"]!="db"){echo(chr(7)."d~!".var_export($conditions,true)."~&");}
    //if(gettype($conditions)!="array"){message::interrupt(var_export($conditions,true));}
    foreach($conditions as $key=>$element){
     //message::I("elem ".$element." is ".gettype($element));
     if(gettype($element)!="array"){
      $query.="$key='".addslashes($element)."' AND ";
     }//Regular => id='1'
     else if(gettype($element[0])!="array"){
      if($element[0]=="<"||$element[0]==">"){
        $query.="$key".$element[0]."'".addslashes($element[1])."'";
      }else{
       if(sizeof($element)==1){
        $query.="$key='".addslashes($element[0])."'";
       }else{
        for($index=0;$index<sizeof($element);$index++){
         $element[$index]=addslashes($element[$index]);
        }
        $query.="$key in ('".implode("','",$element)."')";
       }
      }
      $query.=" AND ";
     }//Selection => WHERE id in (3,4)
     else{$query.="($key BETWEEN '".$element[0]["low"]."' AND '".$element[0]["high"]."') AND ";}//Range => WHERE (id BETWEEN '1' AND '10')
    }
    $query=substr($query,0,-5);
   }
   return $query;
  }
  public static function getRange($low,$high){
   return array("low"=>$low,"high"=>$high);
  }

  public static function exists($conditions){return DB::existsIn(DB::$table["tableName"],$conditions);}
  public static function insert($variables){return DB::insertInto(DB::$table["tableName"],$variables);}
  public static function update($variables,$conditions){return DB::updateOn(DB::$table["tableName"],$variables,$conditions);}
  public static function erase($conditions){return DB::eraseFrom(DB::$table["tableName"],$conditions);}

  public static function select($conditions){return DB::selectFieldsFrom(DB::$table["tableName"],$conditions,null);}
  public static function selectFrom($table,$conditions){return DB::selectFieldsFrom($table,$conditions,null);}
  public static function selectFields($conditions,$fields){return DB::selectFieldsFrom(DB::$table["tableName"],$conditions,$fields);}
  public static function selectSingle($conditions){return DB::selectSingleFieldsFrom(DB::$table["tableName"],$conditions,null);}
  public static function selectSingleFrom($table,$conditions){return DB::selectSingleFieldsFrom($table,$conditions,null);}
  public static function selectSingleFields($conditions,$fields){return DB::selectSingleFieldsFrom(DB::$table["tableName"],$conditions,$fields);}

  public static function insertInto($table,$variables){
   //$variables=DB::decodeID($variables,1);
   $fields="";$values="";
   foreach($variables as $field=>$value){
    $fields.=DB::clean($field).
;
    $values.="'".DB::clean($value)."',";
   }
   DB::query("INSERT INTO $table(".substr($fields,0,-1).") VALUES(".substr($values,0,-1).")");
   return DB::lastID();
  }
  public static function existsIn($table,$conditions){
   $result=DB::query(DB::conditions("SELECT * FROM $table",$conditions));
   return !($result==false||mysqli_num_rows($result)==0);
  }
  public static function selectFieldsFrom($table,$conditions,$fields){
   $result=DB::query(DB::conditions("SELECT ".(isset($fields)?$fields:"*")." FROM $table",$conditions));
   if(!$result){error("Select Single failed on:
$table,[$conditions],[$fields]");}
   return $result==false||mysqli_num_rows($result)==0?false:DB::iterateResults($result);
  }
  public static function selectSingleFieldsFrom($table,$conditions,$fields){
   return !($fetched=DB::selectFieldsFrom($table,$conditions,$fields))?false:$fetched[0];
  }
  public static function updateOn($table,$variables,$conditions){
   //$variables=DB::decodeID($variables,1);
   $query="UPDATE $table SET ";
   foreach($variables as $field=>$value){$query.=DB::clean($field)."='".DB::clean($value)."', ";}
   return DB::query(DB::conditions(substr($query,0,-2),$conditions));
  }
  public static function eraseFrom($table,$conditions){
   return DB::query(DB::conditions("DELETE FROM $table",$conditions));
  }

  public static function error($query){
   message::interrupt($query);
   message::interrupt(mysqli_error(DB::$conn));
   PHP();
  }
  public static function handlePostVars($edit){
   $edit=$edit?2:1;
   //Get the special links array for the special type section
   $links=explode(",",DB::$table["tableFieldNames"]);
   $temp=explode(",",DB::$table["links"]);
   for($index=0;$index<sizeof($temp);$index++){
    $temp[$index]=explode(";",$temp[$index]);
    $links[$temp[$index][0]]=$temp[$index][1];
   }
   $names=explode(",",DB::$table["tableFieldNames"]);
   for($index=0;$index<sizeof($temp);$index++){
    if($temp[$index][1]=="USER"&&isset($_SESSION['ID'])){
     //echo $tableB["tableName"]."
";
     $_POST["CAT1"]=$temp[$index][1];
     $tableB=tableDetails();
     //blinmessage::d("The Table Is ".$tableB["tableName"]."!!!");
     if(($temp[$index][2]=DB::selectSingleFrom($tableB["tableName"],$conditions))!=false){
      if($temp[$index][2][$names[$temp[$index][0]]]==$_SESSION['ID']){$owner=true;}
      else{$owner=false;}
   } } }

   /*/Get the permissions and compare it to the userID
   message::d($owner." ".$_SESSION['ID']." ".$admin);
   if(isset($owner)&&$_SESSION['ID']!=$admin){
    if($owner&&$table["permissions"][0]<$edit){message::e("You don't have permission to edit, sorry.");exit();}
    else if(!$owner&&$table["permissions"][1]<$edit){message::e("You don't have permission to edit. Ask the user or an administrator");exit();}
   }else if(!isset($_SESSION['ID'])&&$table["permissions"][2]<$edit){message::e("You don't have permission to edit, try logging in.");exit();}//*/
   //Deal with any special types
   $types=explode(",",DB::$table["tableFieldTypes"]);
   /*($links=explode(",",DB::$table["links"]);
   for($index=0;$index<sizeof($links);$index++){
    $links[$index]=explode(";",$links[$index]);
   }*/
   for($index=0;$index<sizeof($types);$index++){
    switch($types[$index]){
     case 17://SelectBox
      if(!isset($links[$index])||!isset($_POST[$names[$index]])||$links[$index]==""||is_int($_POST[$names[$index]])){break;}

      //$_POST["CAT1"]=$links[$index];//"TAG";//;
      DB::tempTable($links[$index]);//"TAG"

      $temp=DB::selectFields(null,DB::$table["selectVars"]);//$tableB["tableName"],array("name"=>$_POST[$names[$index]]));
      //TODO: Uncomment these three lines in order to fix the third one, what needs doing is to check if I'm pushing or pulling the information. If I'm pushing it to the DB, search the name(or whatever field, set by index 1 of the selectVars field) otherwise if pulling, get it from the id... Need to change the line above this one also so it's only pulling the id.
      $selectedVar=explode(",",DB::$table["selectVars"])[1];
      //message::ARR($temp);
      for($innerdex=0;$innerdex<sizeof($temp);$innerdex++){
       message::I($innerdex." and ".$index." is ".$_POST[$names[$index]]." and ".$temp[$innerdex][$selectedVar]."
");
       if($_POST[$names[$index]]==$temp[$innerdex][$selectedVar]){
        $_POST[$names[$index]]=$innerdex+1;
       }
      }
      //message::I("$ _POST[".$names[$index]."] is in fact ".$temp["id"]);
      //$_POST[$names[$index]]=$temp["id"];


      //DB::connect($table["dbName"]);
      DB::restoreTable();
      break;
   } }
   //Unset any fields that are not editable
   $editable=explode(",",DB::$table["tableFieldEditable"]);
   for($index=0;$index<sizeof($editable);$index++){
    if($editable[$index]==0){unset($_POST[$names[$index]]);}
   }
   if($_POST["id"]>0){require_once("tags/set.php");}//Deal with the tags
  }
  public static function getWeek($fieldName,$monday){
   DB::query("SELECT * FROM ".DB::$table["tableName"]." WHERE ".$fieldName." > DATE_SUB("\".$monday."\", INTERVAL 1 WEEK) ORDER BY id  DESC;");
  }
  public static function encodeID($object){//,$multiplier){
   if(!isset($object["id"])){return $object;}
   $value=$object["id"];
   if($value==null||(gettype($value)!='integer'&&gettype($value)!='double')){error('ID needs to be a number');}
   $value=intval($value);//+(100000000000));//*($multiplier!=null?$multiplier:1)));
   $result='';
   $length=strlen(DB::$dict);
   //echo "log Length=".log($length);
   for($index=floor(log($value)/log($length));$index>=0;$index--){
    $result.=DB::$dict.substr((floor($value/pow($length,$index))%$length),1);
   }
   $object["id"]=strrev($result);
   return $object;
  }
  public static function decodeID($object){//,$multiplier){
   if(!isset($object["id"])){return $object;}
   $encoded=$object["id"];
   if($encoded==null||gettype($encoded)!='string'){error('Encoded ID needs to be a string.');}

   $encoded=strrev($encoded);
   $result=0;

   for($index=0;$index<=strlen($encoded)-1;$index++){
    $result=$result+strpos(DB::$dict,substr($encoded,$index,1))*(pow(strlen($dict),strlen($encoded)-1-$index));
   }
   $object["id"]=$result;//-(100000000000);//*($multiplier!=null?$multiplier:1));
   return $object;
  }
  //To protect MySQL injection
  public static function clean($value,$removeNL=true){
   $value=@trim($value);
   if(version_compare(phpversion(),'4.3.0')>=0){
    if(get_magic_quotes_gpc()){$value=stripslashes($value);}
    if(@mysqli_ping(DB::$conn)){$value=mysqli_real_escape_string(DB::$conn,$value);}
    else{$value=addslashes($value);}
    if($removeNL){
     $injections=array('/(
+)/i','/(
+)/i','/(	+)/i','/(%0A+)/i','/(%0D+)/i','/(%08+)/i','/(%09+)/i');
     $value=preg_replace($injections,'',$value);
    }
   } else if(!get_magic_quotes_gpc()){$value=addslashes($value);}
   return $value;
  }
  public static function lastID(){return mysqli_insert_id(DB::$conn);}

  public static function tempTable($CAT1){
   DB::$heldTable=DB::$table["referer"];
   $_POST["CAT1"]=$CAT1;
   DB::$table=DB::tableDetails();
  }
  public static function restoreTable(){
   $_POST["CAT1"]=DB::$heldTable;
   DB::$table=DB::tableDetails();
   //unset($_POST["CAT1"]);
  }
  public static function iterateResults($mysqlObj){
   $results=array();
   while($object=$mysqlObj->fetch_array(MYSQL_ASSOC)){
    array_push($results,$object);
   }
   return $results;
  }
 }
 DB::init($DBHOST,$DBUSER,$DBPASS);
 $user=checkLogin();
?>