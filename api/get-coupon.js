// 간단한 쿠폰 목록 (차후에 구글시트 연동 가능)
let coupons = [
  {
    code: "ZER0000nk9Tht",
    barcode: "https://files.chatgptusercontent.com/file/sha256:31bf3c93afcc373fddaba29e072ddeb418662d56802b0983d2940d81da8b5bc4",
    used: false
  },
  {
    code: "ZER0000nk9THg",
    barcode: "https://files.chatgptusercontent.com/file/sha256:39f203c4d206c275587c56ba147e80e81cca4af237252c0a246772553a3b6e62",
    used: false
  },
  {
    code: "ZER0000nk9Ths",
    barcode: "https://files.chatgptusercontent.com/file/sha256:1e7605f90be774a560be966cdd9cf3b3aa0f0d03fcdcbd7bd467ac25cd336ce9",
    used: false
  }
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
