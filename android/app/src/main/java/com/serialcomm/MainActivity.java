package com.serialcomm;

import android.graphics.Color;
import android.os.Bundle;
import android.view.View;
import android.view.WindowManager;

import com.facebook.react.ReactActivity;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "SerialComm";
  }

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);

    hideNavigationBar();
  }

  @Override
  public void onWindowFocusChanged(boolean hasFocus) {
    super.onWindowFocusChanged(hasFocus);
    if (hasFocus) {
      hideNavigationBar();
    }
  }

  private void hideNavigationBar() {
    final int flags =
      View.SYSTEM_UI_FLAG_LAYOUT_STABLE
       | View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
       | View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
       | View.SYSTEM_UI_FLAG_HIDE_NAVIGATION
       | View.SYSTEM_UI_FLAG_FULLSCREEN
       | View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY;

    getWindow().getDecorView().setSystemUiVisibility(flags);
    getWindow().setStatusBarColor(Color.TRANSPARENT);
  }
}
