const QRCode = require('qrcode.react');

export const QRCodeGenerator = ({ url }) => {
  return (
    <div
      style={{
        position: 'absolute',
        top: '150px',
        right: '40px',
        zIndex: '1000',
      }}
    >
      <QRCode value={url} includeMargin="true" size={76} />
    </div>
  );
};
