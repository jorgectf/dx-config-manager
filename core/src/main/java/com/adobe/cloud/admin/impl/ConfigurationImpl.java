/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package com.adobe.cloud.admin.impl;

import java.util.Calendar;
import java.util.LinkedHashSet;
import java.util.Set;

import javax.annotation.PostConstruct;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.InjectionStrategy;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;

import com.adobe.cloud.admin.Configuration;
import com.day.cq.replication.ReplicationStatus;
import com.day.cq.wcm.api.Page;

@Model(
    adaptables = {
        SlingHttpServletRequest.class
    }, 
    adapters = {
        Configuration.class
    }
)
public class ConfigurationImpl implements Configuration {

    private static final String CONF_CONTAINER_BUCKET_NAME = "settings";

    private static final String CLOUDCONFIG_NAME = "adobe-fonts";

    private static final String CLOUDCONFIG_BUCKET_NAME = "cloudconfigs";

    private static final String CLOUDCONFIG_PATH = CLOUDCONFIG_BUCKET_NAME  + "/" + CLOUDCONFIG_NAME;

    @Self(injectionStrategy = InjectionStrategy.REQUIRED)
    private SlingHttpServletRequest request;

    @SlingObject(injectionStrategy = InjectionStrategy.REQUIRED)
    private ResourceResolver resourceResolver;

    private Resource pageResource;

    private Page page;

    @PostConstruct
    private void init() {
        pageResource = request.getResource();
        if (pageResource != null) {
            page = pageResource.adaptTo(Page.class);
        }
    }

    @Override
    public String getTitle() {
       return page != null ? page.getTitle() : pageResource.getName();
    }

    @Override
    public boolean hasChildren() {
        if (pageResource.hasChildren()) {
            for (Resource child : pageResource.getChildren()) {
                boolean isContainer = isConfigurationContainer(child);
                boolean hasSetting = hasSetting(child, CLOUDCONFIG_PATH);
                if (isContainer || hasSetting) {
                    return true;
                }
            }
        }
        return false;
    }

    @Override
    public Calendar getLastModifiedDate() {
        if (page != null) {
            return page.getLastModified();
        }
        return null;
    }

    @Override
    public String getLastModifiedBy() {
        if (page != null) {
            return page.getLastModifiedBy();
        }
        return null; 
    }

    @Override
    public Calendar getLastPublishedDate() {
        ReplicationStatus replicationStatus = pageResource.adaptTo(ReplicationStatus.class);
        if (replicationStatus != null) {
            return replicationStatus.getLastPublished();
        }
        return null;
    }

    @Override
    public Set<String> getQuickactionsRels() {
        Set<String> quickactions = new LinkedHashSet<String>();
        if (isConfiguration(pageResource)) {
            quickactions.add("cq-confadmin-actions-properties-activator");
            quickactions.add("cq-confadmin-actions-publish-activator");
            quickactions.add("cq-confadmin-actions-unpublish-activator");
            quickactions.add("cq-confadmin-actions-delete-activator");
        }
        return quickactions;
    }


    private boolean isConfigurationContainer(Resource resource) {
        return (resource != null && resource.isResourceType("sling:Folder")
            && !CONF_CONTAINER_BUCKET_NAME.equals(resource.getName()));
    }

    private boolean hasSetting(Resource resource, String settingPath) {
        return (resource != null && resource.getChild(settingPath) != null);
    }

    private boolean isConfiguration(Resource resource) {
        if (resource != null) {
            Resource parent = resource;

            do {
                if (CLOUDCONFIG_BUCKET_NAME.equals(parent.getName())) {
                    return true;
                }
                parent = parent.getParent();
            } while (parent != null);
        }
        return false;
    }
}