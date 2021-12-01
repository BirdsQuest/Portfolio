//When the builder is being initialised, the different rules are divided by periods
public void OpenNotification(Context context,int category,String title,String content,Intent pendingNotificationIntent){
 Notification notification=new android.support.v7.app.NotificationCompat.Builder(context)
  .setSmallIcon(R.drawable.ic_launcher)//Set the icon
  .setContentTitle(title) //Set the title, when using constant strings it's better to use strings.xml with context.getResources().getString(R.string.notificationTitle)
  .setContentText(content) //And the description
  //.setContent(remoteViews)//set the content with a customView instead of the above two lines
  //.setCustomHeadsUpContentView(remoteViews)//If you want a heads up view popup
  .setCategory(category)//See CATEGORY_* in https://developer.android.com/reference/android/app/Notification.html
  .setVisibility(Notification.VISIBILITY_PUBLIC)//Set the visibility to VISIBILITY_SECRET=not on lockscreen, VISIBILITY_PRIVATE=show on lockscreen but hide info, VISIBILITY_PUBLIC=show all on lockscreen
  .setContentIntent(pendingNotificationIntent)//The intent that runs when the notification is clicked
  .addAction(android.R.drawable.ic_menu_view, context.getResources().getString(R.string.viewDetails), pendingNotificationIntent)
  .setImportance(NotificationCompat.PRIORITY_DEFAULT)//Sets the level of interruption -> IMPORTANCE_UNSPECIFIED, IMPORTANCE_NONE, IMPORTANCE_MIN, IMPORTANCE_LOW, IMPORTANCE_DEFAULT or IMPORTANCE_HIGH
  .setVibrate(new long[]{1000, 1000, 1000, 1000, 1000})//Vibration pattern, this example vibrates five times for a second each
  .setAutoCancel(true)//The notification will dissappear when touched
  //.setOngoing(true)//Can't be swiped away
  .build();
 
 NotificationManager notificationManager=(NotificationManager)context.getSystemService(Context.NOTIFICATION_SERVICE);
 notificationManager.notify(R.string.notificationID, notification);//Using the same notification ID overwrites existing notifications
}