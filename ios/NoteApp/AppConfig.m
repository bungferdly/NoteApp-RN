//
//  AppConfig.m
//  NoteApp
//
//  Created by Ferdly Sethio on 21/1/19.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "AppConfig.h"

@implementation AppConfig

RCT_EXPORT_MODULE();

+ (BOOL)requiresMainQueueSetup{
  return NO;
}

- (NSDictionary *)constantsToExport {
  
#ifdef DEV
  NSString *env = @"dev";
#endif

#ifdef SIT
  NSString *env = @"sit";
#endif
  
#ifdef UAT
  NSString *env = @"uat";
#endif
  
#ifdef PROD
  NSString *env = @"prod";
#endif
  
  return @{ @"env" : env };
}

@end
