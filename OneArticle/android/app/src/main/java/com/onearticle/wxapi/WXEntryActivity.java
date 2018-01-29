package com.onearticle.wxapi;

import android.app.Activity;
import android.os.Bundle;
import android.support.annotation.Nullable;

import com.theweflex.react.WeChatModule;

/**
 * Created by wangxuan on 2018/1/23.
 */

public class WXEntryActivity extends Activity{

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        WeChatModule.handleIntent(getIntent());
        finish();
    }

}
