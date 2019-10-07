package com.adobe.cloud.fonts.impl;

import javax.annotation.PostConstruct;

import com.adobe.cloud.fonts.Settings;
import com.adobe.cloud.fonts.SettingsProvider;
import com.adobe.cloud.fonts.Tag;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.OSGiService;
import org.apache.sling.models.annotations.injectorspecific.Self;

@Model(adaptables = { SlingHttpServletRequest.class }, adapters = { Tag.class })
public class TagImpl implements Tag {

    private static final String configName = "adobe-fonts";

    @Self
    private SlingHttpServletRequest request;

    @OSGiService
    private SettingsProvider settingsProvider;

    private Settings settings;

    @PostConstruct
    public void postConstruct() {
        settings = settingsProvider.getSettings(request, configName);
    }

    @Override
    public String getId() {
        if (settings != null) {
            return settings.getId();
        }
        return null;
    }

    @Override
    public String getEmbedType() {
        return settings.getEmbedType();
    }

    @Override
    public String getUrl() {
        return settings.getUrl();
    }
}
