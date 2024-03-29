import type { Metadata } from "next";
  import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <title>Next x Raygun demo app</title>
        <meta name="description" content="A demo application showcasing Raygun inegrations with a NextJS app." />
        <script
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html: `
              !function(a,b,c,d,e,f,g,h){a.RaygunObject=e,a[e]=a[e]||function(){
              (a[e].o=a[e].o||[]).push(arguments)},f=b.createElement(c),g=b.getElementsByTagName(c)[0],
              f.async=1,f.src=d,g.parentNode.insertBefore(f,g),h=a.onerror,a.onerror=function(b,c,d,f,g){
              h&&h(b,c,d,f,g),g||(g=new Error(b)),a[e].q=a[e].q||[],a[e].q.push({
              e:g})}}(window,document,"script","//cdn.raygun.io/raygun4js/raygun.min.js","rg4js");
  
              rg4js('apiKey', 'ENTER_API_KEY');
              rg4js('enableCrashReporting', true);
              rg4js('enablePulse', true);
              
              rg4js('withTags', ['nextjs', 'demo']);
              
              rg4js('onBeforeSend', function (payload) {
                let updatedPayload = payload;
                
                // Target script errors
                if (payload.Details?.Error?.Message == 'Script error.') {
                  const stackUrlBlacklist = ["ErrorButton.client.tsx"]; // Blacklist for stack trace URLs
                  const googleAdsUrls = ["googleads.g.doubleclick.net", "www.googletagmanager.com"]; // Google URL list for rewrite
              
                  // We've encountered a script error, inspect the fileName (url) against configured logic
                  if (!!payload.Details.Error.StackTrace) {
                    if (payload.Details.Error.StackTrace.some(frame => stackUrlBlacklist.some(url => frame.FileName.includes(url)))) {
                      // Return false to ignore this error
                      return false;
                    }
                    if (payload.Details.Error.StackTrace.some(frame => googleAdsUrls.some(url => frame.FileName.includes(url)))) {
                      // Update the error message to be more user friendly
                      updatedPayload.Details.Error.Message = "An error occurred while loading an ad.";
                    }
                  }
                }
                return updatedPayload;
              });`,
            }}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}