/*//build.gradle
dependencies {
    compile fileTree(dir: 'libs', include: ['*.jar'])
    compile 'com.google.android.gms:play-services-ads:8.4.0'
}
//manifest.xml
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />

<activity android:name="com.google.android.gms.ads.AdActivity" android:configChanges="keyboard|keyboardHidden|orientation|screenLayout|uiMode|screenSize|smallestScreenSize" android:theme="@android:style/Theme.Translucent" />
//Main.java
AdMob adMob;
adMob=new AdMob(this);

@Override public void onClick(View v) {
    if (adMob.interstitialAd.isLoaded()){adMob.interstitialAd.show();}
    else {beginSecondActivity();}
}

@Override public void onResume() {super.onResume();adMob.onResume();}
@Override public void onPause() {adMob.onPause();super.onPause();}
@Override public void onDestroy() {adMob.onDestroy();super.onDestroy();}
*/
package com.questofalifetime.advertising;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.view.Gravity;
import android.widget.FrameLayout;
import android.widget.RelativeLayout;

import com.google.android.gms.ads.AdListener;
import com.google.android.gms.ads.AdRequest;
import com.google.android.gms.ads.AdSize;
import com.google.android.gms.ads.AdView;
import com.google.android.gms.ads.InterstitialAd;

public class AdMob {
    public AdView adView;//A banner ad at the bottom of the screen
    public FrameLayout.LayoutParams params;//For placing that banner ad
    public InterstitialAd interstitialAd;;//The fullscreen ad for in between screens
 //The keys for the two ads, get unique keys(and test keys) by following this
 // https://developers.google.com/admob/android/quick-start
    final String test_banner_ad_unit_id="ca-app-pub-3940256099942544/6300978111";
    final String test_interstitial_ad_unit_id="ca-app-pub-3940256099942544/1033173712"
 
 //In the constructor, create the two different types of ads.
    public AdMob(final Context context){
        addBannerAd(context);//Create the banner ad
        //Create an InterstitialAd object. This same object can be re-used whenever you want to show an interstitial.
        interstitialAd = new InterstitialAd(context);
        interstitialAd.setAdUnitId(test_interstitial_ad_unit_id);
  //When it's closed, launch the next activity
        interstitialAd.setAdListener(new AdListener() {
            @Override
            public void onAdClosed() {
                requestNewInterstitial();
                Intent intent = new Intent(context, SecondActivity.class);
                context.startActivity(intent);
            }
        });
    }

    public void addBannerAd(Context context){
        //Load the banner ad
        adView=new AdView(context);//AdView is the container
        adView.setAdSize(AdSize.SMART_BANNER);
        adView.setAdUnitId(test_banner_ad_unit_id);
        AdRequest adRequest = new AdRequest.Builder().build();//This is the ad that goes in the container
        adView.loadAd(adRequest);//Fill it
  //Size and position it
        params = new FrameLayout.LayoutParams(RelativeLayout.LayoutParams.WRAP_CONTENT, RelativeLayout.LayoutParams.WRAP_CONTENT);
        params.gravity= Gravity.BOTTOM;
        adView.setLayoutParams(params);
        ((Activity) context).addContentView(adView, params);//And attach it
    }

    /** Load a new interstitial ad asynchronously. */
    private void requestNewInterstitial() {
        AdRequest adRequest = new AdRequest.Builder().build();
        interstitialAd.loadAd(adRequest);//Fill the ad container with the ad
    }
    
    public void onPause() {if (adView != null) {adView.pause();}}
    public void onResume() {if (adView != null) {adView.resume();}if (!interstitialAd.isLoaded()) {requestNewInterstitial();}}
    public void onDestroy() {if (adView != null) {adView.destroy();}}
}