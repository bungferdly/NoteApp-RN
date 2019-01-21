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
  
#ifdef MOCK
  NSString *env = @"mock";
#endif
  
#ifdef DEV
  NSString *env = @"dev";
#endif
  
#ifdef PROD
  NSString *env = @"prod";
#endif
  
  return @{ @"env" : env };
}

@end
