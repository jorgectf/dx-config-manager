package com.adobe.cloud.fonts.impl;

import com.adobe.cloud.fonts.Settings;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Default;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.InjectionStrategy;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@Model(
    adaptables = {
        Resource.class
    },
    adapters = {
        Settings.class
    }
)
public class SettingsImpl implements Settings {

    private static final String BASE_URL = "https://use.typekit.net";

    @Self(injectionStrategy = InjectionStrategy.REQUIRED)
    private Resource resource;

    @ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL)
    private String projectId;

    @ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL)
    @Default(values = "linkTag")
    private String embedType;

    @Override
    public String getId() {
        return projectId;
    }

    @Override
    public String getEmbedType() {
        return embedType;
    }

    @Override
    public String getUrl() {
        return BASE_URL;
    }
}
