package com.corelab.springboot.util;

import org.springframework.stereotype.Component;

import java.time.Instant;
import java.util.Date;

@Component
public class DateUtil {

    public Date getDate(Long timeStamp) {
        if(timeStamp == null) {
            return null;
        }
        Instant instant = Instant.ofEpochSecond(timeStamp);

        return Date.from(instant);
    }
}
