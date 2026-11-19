import { LanguageProvider } from "@/contexts/LanguageContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { LegalDoc, type LegalSection } from "@/components/LegalDoc";

const sections: LegalSection[] = [
  {
    title: { en: "Free previews", zh: "免費預覽" },
    body: [
      { en: "We build two free website previews from the public content of the website you submit. No payment or credit card is needed to see them.", zh: "我們會根據您提交的網站公開內容，免費製作兩個網站預覽。查看預覽不需付款，也不需信用卡。" },
      { en: "Preview links are active for 72 hours. If you reply within about 3 months, we can reopen your previews; after that, please submit your website again.", zh: "預覽連結有效期為 72 小時。若您在約 3 個月內回覆，我們可以重新開啟預覽；超過時間請重新提交網站。" },
    ],
  },
  {
    title: { en: "Packages and revisions", zh: "方案與修改" },
    body: [
      { en: "Each package includes the pages, features and revision rounds listed on our website at the time you order. Your package includes 2 rounds of revisions; please send all of your changes together in each round. Extra revision rounds, additional pages and add-ons are charged at the prices listed on our website.", zh: "每個方案包含下單時網站上列出的頁面、功能與修改次數。方案含 2 輪修改，請每一輪把所有修改一次提出。額外的修改輪數、頁面與加購項目，依網站上列出的價格收費。" },
    ],
  },
  {
    title: { en: "Payment", zh: "付款" },
    body: [
      { en: "You pay only once you are happy with your website, after revisions and before it goes live. Payments are processed securely by Stripe. All prices are in US dollars unless stated otherwise.", zh: "您在完成修改、確認滿意後、網站上線前才需付款。付款由 Stripe 安全處理。除非另有註明，所有價格均以美元計價。" },
      { en: "Because you approve your website before paying, all payments are final and non-refundable.", zh: "由於您是在確認網站後才付款，所有款項一經支付概不退還。" },
    ],
  },
  {
    title: { en: "Hosting and edits after launch", zh: "上線後的主機與修改" },
    list: [
      { en: "Free hosting: your website is hosted on our platform at no monthly cost.", zh: "免費主機：您的網站架設在我們的平台上，不收月費。" },
      { en: "Changes after launch are $45 per edit, unless you have a Care Plan.", zh: "上線後的修改每次 $45，除非您訂閱了 Care Plan。" },
      { en: "Care Plan ($135/year): up to 2 small edits per month, such as text, photos or layout tweaks to existing pages. It does not include new pages, new features or blog posts. It renews yearly until cancelled; cancellation takes effect at the end of the paid year, with no partial refunds.", zh: "Care Plan（每年 $135）：每月最多 2 次小修改，例如文字、照片或現有頁面的版面調整，不含新頁面、新功能或部落格文章。每年自動續約直到取消；取消於已付年度結束時生效，不按比例退款。" },
      { en: "If you prefer to manage your own hosting, we can give you your website files to host elsewhere.", zh: "若您想自行管理主機，我們可以提供網站檔案，讓您架設在其他地方。" },
    ],
  },
  {
    title: { en: "Your domain, email and old hosting", zh: "您的網域、電子郵件與舊主機" },
    body: [
      { en: "Your domain, email and content always belong to you. We connect your new website to your domain without changing your email. You are responsible for cancelling any previous website or hosting plan so it does not renew.", zh: "您的網域、電子郵件與內容永遠屬於您。我們會將新網站連接到您的網域，不會更動您的電子郵件。您需自行取消舊網站或主機方案，避免自動續約。" },
    ],
  },
  {
    title: { en: "Ownership and credit", zh: "所有權與署名" },
    body: [
      { en: "Once paid in full, your website design and content are yours, excluding third-party fonts, images or software licensed separately. We may show your website in our portfolio and include a small \"Design by SwiftLift.app\" credit in the footer.", zh: "全額付款後，網站設計與內容歸您所有，但不包括另行授權的第三方字型、圖片或軟體。我們可能會將您的網站放入作品集，並在頁尾加上小字「Design by SwiftLift.app」。" },
    ],
  },
  {
    title: { en: "Your content", zh: "您的內容" },
    body: [
      { en: "You confirm that you have the right to use the text, photos and logos on the website you submit and on anything you send us.", zh: "您確認有權使用您提交的網站，以及寄給我們的所有資料中的文字、照片與標誌。" },
    ],
  },
  {
    title: { en: "Limitation of liability", zh: "責任限制" },
    body: [
      { en: "Our total liability for any claim is limited to the amount you paid us for the service in question. We are not liable for indirect or consequential losses, such as lost profits or business interruption.", zh: "我們對任何索賠的總責任，以您為該項服務支付的金額為上限。對於間接或衍生性損失（例如利潤損失或營業中斷），我們不負責任。" },
    ],
  },
  {
    title: { en: "Changes and governing law", zh: "條款變更與準據法" },
    body: [
      { en: "We may update these terms from time to time; the version posted here applies. Changes that affect a plan you pay for will be emailed to you first. These terms are governed by the laws of British Columbia, Canada.", zh: "我們可能不時更新本條款，以本頁公布的版本為準。若變更影響您付費的方案，我們會先以電子郵件通知。本條款受加拿大卑詩省法律管轄。" },
    ],
  },
];

const TermsOfService = () => (
  <LanguageProvider>
    <div className="min-h-screen bg-background scroll-smooth">
      <Header />
      <LegalDoc
        path="/terms"
        title={{ en: "Terms of Service", zh: "服務條款" }}
        effective={{ en: "Last updated: November 19, 2026", zh: "最後更新：2026年11月19日" }}
        intro={[{ en: "These terms apply when you use SwiftLift (\"we\", \"us\"), a website redesign service for small businesses. By requesting a preview or buying a package, you agree to them.", zh: "當您使用 SwiftLift（以下稱「我們」）這項小型企業網站改版服務時，適用本條款。申請預覽或購買方案，即表示您同意本條款。" }]}
        sections={sections}
      />
      <Footer />
    </div>
  </LanguageProvider>
);

export default TermsOfService;
