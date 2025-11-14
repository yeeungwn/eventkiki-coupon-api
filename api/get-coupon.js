// 간단한 쿠폰 목록 (차후에 구글시트 연동 가능)
let coupons = [
  { code: "COUPON-001", barcode: "https://your-image-url-1.png", used: false },
  { code: "COUPON-002", barcode: "https://your-image-url-2.png", used: false },
  { code: "COUPON-003", barcode: "https://your-image-url-3.png", used: false },
];

export default function handler(req, res) {
  // 아직 안 쓴 쿠폰 찾기
  const available = coupons.find(c => c.used === false);

  if (!available) {
    return res.status(200).json({ status: "NO_STOCK", msg: "쿠폰 소진됨" });
  }

  // 쿠폰 사용 처리
  available.used = true;

  // 사용자에게 전달할 HTML UI
  const html = `
    <div style="text-align:center;">
      <h2>🎉 축하합니다!</h2>
      <p>쿠폰번호: <b>${available.code}</b></p>
      <img src="${available.barcode}" style="width:250px;">
    </div>
  `;

  return res.status(200).json({
    status: "OK",
    code: available.code,
    barcode: available.barcode,
    html,
  });
}
