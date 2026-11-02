"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function InstallTabs() {
  return (
    <Tabs defaultValue="windows" className="w-full">
      <TabsList className="mb-4 h-10 w-full max-w-md bg-muted/60">
        <TabsTrigger value="windows" className="flex-1">
          Windows
        </TabsTrigger>
        <TabsTrigger value="macos" className="flex-1">
          macOS
        </TabsTrigger>
        <TabsTrigger value="linux" className="flex-1">
          Linux
        </TabsTrigger>
      </TabsList>

      <TabsContent value="windows">
        <Card className="glass border-border bg-transparent ring-0">
          <CardHeader>
            <CardTitle className="text-lg">Windows 11 22H2+</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-muted-foreground">
            <p>
              Tải chứng chỉ và file{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground">
                .msix
              </code>
              . Tin cậy chứng chỉ <strong className="text-foreground">một lần</strong> trong
              PowerShell chạy bằng quyền Administrator:
            </p>
            <pre className="overflow-x-auto rounded-xl border border-border bg-black/40 p-4 font-mono text-xs text-[#b8f5d0]">
              {`Import-Certificate -FilePath .\\ViberVN-signing.cer -CertStoreLocation Cert:\\LocalMachine\\TrustedPeople`}
            </pre>
            <p>
              Rồi mở file{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground">
                .msix
              </code>{" "}
              và chọn Install.
            </p>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="macos">
        <Card className="glass border-border bg-transparent ring-0">
          <CardHeader>
            <CardTitle className="text-lg">macOS 13+</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-muted-foreground">
            <p>
              Mở{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground">
                .dmg
              </code>{" "}
              và kéo ứng dụng vào Applications. Lần đầu macOS sẽ chặn: System Settings → Privacy
              &amp; Security → Open Anyway, hoặc:
            </p>
            <pre className="overflow-x-auto rounded-xl border border-border bg-black/40 p-4 font-mono text-xs text-[#b8f5d0]">
              {`xattr -dr com.apple.quarantine "/Applications/ViberVN Bot.app"`}
            </pre>
            <p>Nếu vẫn báo ứng dụng bị hỏng, tự ký một lần:</p>
            <pre className="overflow-x-auto rounded-xl border border-border bg-black/40 p-4 font-mono text-xs text-[#b8f5d0]">
              {`codesign --force --deep --sign - "/Applications/ViberVN Bot.app"`}
            </pre>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="linux">
        <Card className="glass border-border bg-transparent ring-0">
          <CardHeader>
            <CardTitle className="text-lg">Linux</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-muted-foreground">
            <p>
              <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground">
                chmod +x
              </code>{" "}
              file{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground">
                .AppImage
              </code>{" "}
              đúng kiến trúc rồi chạy nó.
            </p>
            <pre className="overflow-x-auto rounded-xl border border-border bg-black/40 p-4 font-mono text-xs text-[#b8f5d0]">
              {`chmod +x VibervnbotBundled-*-linux-x86_64.AppImage
./VibervnbotBundled-*-linux-x86_64.AppImage`}
            </pre>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
