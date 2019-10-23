package com.adobe.www.dx.configmanager;

import static com.adobe.www.dx.configmanager.Constants.BAD_LIST;
import static com.adobe.www.dx.configmanager.Constants.FOLDER_TYPES;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@Model(adaptables = { Resource.class },
       defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class ColumnViewItem {

    @Self
    private Resource resource;

    @ValueMapValue(name = "jcr:primaryType")
    private String primaryType;

    public String getLabel() {
        return resource.getName();
    }

    public String getPath() {
        return resource.getPath();
    }

    public String getIconType() {
        boolean isFolder = Arrays.stream(FOLDER_TYPES).anyMatch(primaryType::equals);
        if (isFolder) {
            return "folder";
        }
        return "config";
    }

    public List<ColumnViewItem> getChildren() {
        List<ColumnViewItem> children = new ArrayList<>();
        Iterable<Resource> childrenIter = resource.getChildren();
        childrenIter.forEach(child -> {
            boolean badListed = Arrays.stream(BAD_LIST).anyMatch(child.getName()::equals);
            if (!badListed) {
                ColumnViewItem item = child.adaptTo(ColumnViewItem.class);
                children.add(item);
            }
        });
        return children;
    }
}