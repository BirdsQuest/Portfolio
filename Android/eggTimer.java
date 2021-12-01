//-------------------------------------------------------------------------------------AndroidManifest.xml
<uses-permission android:name="android.permission.WAKE_LOCK" />
<uses-permission android:name="android.permission.SYSTEM_ALERT_WINDOW" />
//...

        <receiver android:name=".EggTimer" android:process=":remote" />
        <service
            android:name=".LockScreenService"
            android:label="Lock Screen Service" >
        </service>
    </application>
 
//-------------------------------------------------------------------------------------------Alarm.java
import android.app.Notification;

import android.app.NotificationManager;
import android.app.PendingIntent;
import android.app.TaskStackBuilder;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.media.MediaPlayer;
import android.net.Uri;
import android.os.PowerManager;
import android.service.notification.StatusBarNotification;
import android.support.v7.app.NotificationCompat;
import android.util.Log;
import android.widget.RemoteViews;
import android.widget.Toast;

import java.net.URI;
public class EggTimer extends BroadcastReceiver{
 public static void set(Context context, String message, int seconds){
     AlarmManager alarmManager=(AlarmManager)context.getSystemService(Context.ALARM_SERVICE);
     Intent intent=new Intent("com.birdsquest.demo.EggTimer");
  intent.putExtra("message", message);
  int randomRequestCode=new Random().nextInt();//Since it's an egg timer, there could be multiple timers running so this will make them not overlap
  //By using a PendingIntent, we give the AlarmManager our application's permissions. Also, if this application is killed, the intent is still usable
     PendingIntent pendingIntent = PendingIntent.getBroadcast(context, randomRequestCode, intent, 0);
  
  //Then set the alarm, we use ELAPSED_REALTIME instead of RTC as it's just running after a set time(rather than at a set time) and WAKEUP as the phone may be asleep and it's important to have the alarm go through
     am.set(AlarmManager.ELAPSED_REALTIME_WAKEUP, SystemClock.elapsedRealtime(), 1000 * seconds, pendingIntent);
 }
    @Override public void onReceive(Context context, Intent intent) {
  //We aquire the PowerManagers WakeLock in case the screens asleep and release it to not keep the screen from being able to turn back off
  PowerManager pm = (PowerManager) context.getSystemService(Context.POWER_SERVICE);
  PowerManager.WakeLock wl = pm.newWakeLock(PowerManager.PARTIAL_WAKE_LOCK, "");
  wl.acquire();
  wl.release();
  
  (MediaPlayer.create(context, R.raw.alarm_sound)).start();//play the sound
  
  //Open a notification using the open notification class that you can see here
  OpenNotification(context,Notification.CATEGORY_ALARM,
   intent.getExtras().getString("message"),//Title
   context.getResources().getString(R.string.touch_to_dismiss),//Description
   null);//The pending Intent
        }
 
 //...
}