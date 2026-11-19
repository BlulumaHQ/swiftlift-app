import { LanguageProvider } from "@/contexts/LanguageContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { LegalDoc, type LegalSection } from "@/components/LegalDoc";

const sections: LegalSection[] = [
  {
    title: { en: "What we collect", zh: "我們收集的資訊" },
    list: [
      { en: "What you give us: your name, email, phone, business details and website address from our forms, and anything you send us such as revision notes, screenshots and photos.", zh: "您提供的資訊：表單中的姓名、電子郵件、電話、業務資料與網站網址，以及您寄給我們的修改說明、截圖與照片。" },
      { en: "Your public website content: to build your previews, we read the publicly available pages of the website you submit.", zh: "您網站的公開內容：為了製作預覽，我們會讀取您所提交網站的公開頁面。" },
      { en: "Payment details: payments are processed by Stripe. We never see or store your full card number.", zh: "付款資料：付款由 Stripe 處理，我們不會看到或儲存您的完整卡號。" },
      { en: "Usage data: pages visited, device and browser type, collected through cookies and analytics tools.", zh: "使用資料：透過 Cookie 與分析工具收集的瀏覽頁面、裝置與瀏覽器類型。" },
    ],
  },
  {
    title: { en: "How we use it", zh: "我們如何使用" },
    list: [
      { en: "To build, send and follow up on your website previews.", zh: "製作、寄送並追蹤您的網站預覽。" },
      { en: "To launch, host and update your website, and to bill you.", zh: "讓網站上線、提供主機與更新服務，並向您收費。" },
      { en: "To reply to your questions and revision requests.", zh: "回覆您的問題與修改需求。" },
      { en: "To measure and improve our website and ads.", zh: "衡量並改善我們的網站與廣告成效。" },
    ],
    body: [{ en: "We do not sell or rent your personal information.", zh: "我們不會出售或出租您的個人資料。" }],
  },
  {
    title: { en: "Cookies and analytics", zh: "Cookie 與分析工具" },
    body: [
      { en: "We use Google Analytics, Microsoft Clarity and the Meta Pixel to understand how visitors use our website and how our ads perform. You can block or delete cookies in your browser settings.", zh: "我們使用 Google Analytics、Microsoft Clarity 與 Meta Pixel 來了解訪客如何使用網站，以及廣告的成效。您可以在瀏覽器設定中封鎖或刪除 Cookie。" },
    ],
  },
  {
    title: { en: "Who we share it with", zh: "與誰分享" },
    body: [
      { en: "Only the service providers we need to run SwiftLift: Stripe (payments), Cloudflare (hosting), Supabase (secure data storage), our email providers, and the analytics tools above. They may only use your information to provide their service to us.", zh: "僅限營運 SwiftLift 所需的服務供應商：Stripe（付款）、Cloudflare（主機）、Supabase（資料安全儲存）、我們的電子郵件服務商，以及上述分析工具。他們只能為了向我們提供服務而使用您的資料。" },
    ],
  },
  {
    title: { en: "How long we keep it", zh: "保存期限" },
    body: [
      { en: "We keep your information while you are a client and afterwards only as long as needed for our records and legal obligations. If you don't go ahead after your previews, you can ask us to delete your previews and details at any time.", zh: "您是客戶期間我們會保存您的資料，之後只在記錄與法律義務所需期間內保存。若您看完預覽後決定不合作，可隨時要求我們刪除預覽與您的資料。" },
    ],
  },
  {
    title: { en: "Your choices", zh: "您的權利" },
    body: [
      { en: "You can ask to see, correct or delete the personal information we hold about you, and unsubscribe from our emails at any time.", zh: "您可以要求查看、更正或刪除我們持有的個人資料，也可以隨時取消訂閱我們的電子郵件。" },
    ],
  },
];

const PrivacyPolicy = () => (
  <LanguageProvider>
    <div className="min-h-screen bg-background scroll-smooth">
      <Header />
      <LegalDoc
        path="/privacy"
        title={{ en: "Privacy Policy", zh: "隱私政策" }}
        effective={{ en: "Last updated: November 19, 2026", zh: "最後更新：2026年11月19日" }}
        intro={[{ en: "This policy explains what information SwiftLift collects, why we collect it and how we look after it.", zh: "本政策說明 SwiftLift 收集哪些資訊、為何收集，以及我們如何保護這些資訊。" }]}
        sections={sections}
      />
      <Footer />
    </div>
  </LanguageProvider>
);

export default PrivacyPolicy;
