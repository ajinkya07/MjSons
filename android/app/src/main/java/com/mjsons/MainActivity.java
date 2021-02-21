package com.mjsons;
import android.os.Bundle;
import android.view.WindowManager;
import com.facebook.react.ReactActivity;
import org.devio.rn.splashscreen.SplashScreen; // here

public class MainActivity extends ReactActivity {

  protected void onCreate(Bundle savedInstanceState) {
      SplashScreen.show(this, R.style.SplashScreenTheme); 
      super.onCreate(savedInstanceState);
      
    //  getWindow().setFlags(
    //    WindowManager.LayoutParams.FLAG_SECURE,
    //    WindowManager.LayoutParams.FLAG_SECURE
    //  );
  }

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "MjSons";
  }
}