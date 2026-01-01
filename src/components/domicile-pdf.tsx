'use client';

import type { SubmittedData } from '@/app/page';
import { Button } from './ui/button';
import { ArrowLeft, Printer } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import QRCode from 'react-qr-code';

interface DomicilePDFProps {
  data: SubmittedData;
  onBack: () => void;
}

export default function DomicilePDF({ data, onBack }: DomicilePDFProps) {
  const formattedDate = new Date(data.date).toLocaleDateString('en-GB');
  
  const qrCodeValue = `https://edistrict.up.gov.in/portal/services/verifyCertificate.aspx?avl_no=${data.avedan}&cert_no=${data.kram}`;

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <div className="no-print mb-8 flex justify-between items-center">
        <div/>
        <div className="flex gap-2">
          <Button onClick={handlePrint}><Printer className="mr-2 h-4 w-4" /> Print</Button>
        </div>
      </div>
      <Card className="printable-area" id="printable-area">
        <CardContent className="p-2 md:p-4">
          <style jsx global>{`
            @media print {
              body {
                background-color: #fff !important;
                margin: 0;
                padding: 0;
              }
              .no-print {
                display: none !important;
              }
              #printable-area {
                width: 100% !important;
                height: 100% !important;
                position: absolute !important;
                top: 0 !important;
                left: 0 !important;
                margin: 0 !important;
                padding: 15px !important;
                border: none !important;
                box-shadow: none !important;
                page-break-after: always;
              }
              .mgn {
                border: 1px solid #000 !important;
                background-image: url("/background.png") !important;
                -webkit-print-color-adjust: exact !important;
                color-adjust: exact !important;
              }
            }
            .mgn {
              border: 1px solid #000000;
              padding-left: 4px;
              padding-right: 4px;
              padding-top: 1px;
              padding-bottom: 1px;
              font-size: 10pt;
              font-family: 'Arial Unicode MS', 'Inter', sans-serif;
              background-color: #fff;
              background-image: url("/background.png");
              background-repeat: no-repeat;
              background-position: center right;
              background-size: 430px;
            }
            .dates, .avedan, .kramank {
              font-size: 11px;
              font-family: verdana, sans-serif;
            }
            .table2 { font-size: 10pt; }
            .img1 { width: 96px; height: 96px; object-fit: cover; }
            .td1 { font-family: verdana, sans-serif; }
            .img2 { width: 100px; height: 100px; }
            .td2 { font-size: 14px; font-family: Arial, sans-serif; }
            .td3 { font-size: 8px; font-family: Arial, sans-serif; }
          `}</style>
          <table className="mgn" border={0} align="center" width="100%" cellSpacing="0" cellPadding="0">
            <tbody>
              <tr><td colSpan={6}>&nbsp;ई-डिस्ट्रिक्ट के अन्तर्गत जारी..</td></tr>
              <tr><td colSpan={6}><p align="center"><img src="/logo.jpg" alt="Logo" width="110" height="110" /></p></td></tr>
              <tr><td colSpan={6}><p align="center" className="text-4xl">उत्तर प्रदेश शासन</p></td></tr>
              <tr><td colSpan={6}><p align="center"><b><span className="text-xl">कार्यालय उप जिलाधिकारी द्वारा प्रदत्त सामान्य निवास प्रमाण पत्र</span></b></p></td></tr>
              <tr><td colSpan={6}>&nbsp;</td></tr>
              <tr>
                <td width="17%" ><b>जिला </b></td>
                <td ><b>{data.district}</b></td>
                <td width="30%" colSpan={3} align="right">&nbsp;</td>
                <td align="left" width="35%" >&nbsp;</td>
              </tr>
              <tr>
                <td width="17%" ><b>तहसील </b></td>
                <td ><b>{data.sbd}</b></td>
                <td width="30%" colSpan={3} align="right">&nbsp;</td>
                <td align="left" width="35%" ><b>जारी दिनांक: <span className="dates">{formattedDate}</span></b></td>
              </tr>
              <tr>
                <td width="17%" valign="top" ><b>आवेदन क्र०</b></td>
                <td width="30%"  valign="top"><b><span className="avedan">{data.avedan}</span></b></td>
                <td width="30%" colSpan={3} valign="top" align="left">&nbsp;</td>
                <td width="35%" align="right">&nbsp;</td>
              </tr>
              <tr>
                <td width="17%"  valign="top"><b>प्रमाणपत्र क्र०</b></td>
                <td width="30%"  valign="top"><b><span className="kramank">{data.kram}</span></b></td>
                <td width="30%" colSpan={3} valign="top" align="left">&nbsp;</td>
                <td width="35%" align="right">&nbsp;</td>
              </tr>
              <tr><td colSpan={6}>&nbsp;</td></tr>
              <tr>
                <td colSpan={6}>
                  <table className="table2" border={0} width="100%" cellSpacing="0" cellPadding="0">
                    <tbody>
                      <tr>
                        <td width="10%" align="left" valign="top">&nbsp;</td>
                        <td width="32%" align="left" colSpan={2} valign="top">सम्बन्धित लेखपाल की जांच आख्या दिनांक <span className="dates">{formattedDate}</span> के आधार पर एतद् द्वारा</td>
                        <td width="25%" rowSpan={6} align="left" valign="top"><img className="img1" src={data.photoUrl} alt="Applicant" /></td>
                      </tr>
                      <tr>
                        <td width="10%" align="left" valign="top">&nbsp;</td>
                        <td width="32%" height="20" align="left" valign="middle">प्रमाणित किया जाता है कि</td>
                        <td className="td1" width="33%" height="20" align="left" valign="middle"><b> {data.hname}/{data.name}</b></td>
                      </tr>
                      <tr>
                        <td width="10%" align="left" valign="top">&nbsp;</td>
                        <td width="32%" height="20" align="left" valign="middle">{data.selectedOption}</td>
                        <td className="td1" width="33%" height="20" align="left" valign="middle"><b>{data.fname}</b></td>
                      </tr>
                      <tr>
                        <td width="10%" align="left" valign="top">&nbsp;</td>
                        <td width="32%" height="20" align="left" valign="middle">माता का नाम</td>
                        <td className="td1" width="33%" height="20" align="left" valign="middle"><b>{data.mname}</b></td>
                      </tr>
                      <tr>
                        <td width="10%" align="left" valign="top">&nbsp;</td>
                        <td width="32%" height="20" align="left" >मकान नम्बर</td>
                        <td className="td1" width="33%" height="20" align="left" valign="middle"><b>{data.house}</b></td>
                      </tr>
                      <tr>
                        <td width="10%" align="left" valign="top">&nbsp;</td>
                        <td width="32%" height="20" align="left" >मोहल्ला</td>
                        <td className="td1" width="33%" height="20" align="left" valign="middle"><b>{data.mohalla}</b></td>
                      </tr>
                      <tr>
                        <td width="20%" align="left"  valign="top">&nbsp;</td>
                        <td width="32%" height="20" align="left"  valign="top">ग्राम</td>
                        <td className="td1" width="33%" height="20" align="left" valign="top"><b>{data.village}</b>&nbsp;</td>
                      </tr>
                      <tr>
                        <td width="20%" align="left"  valign="top">&nbsp;</td>
                        <td width="32%" height="20" align="left"  valign="top">थाना</td>
                        <td className="td1" width="33%" height="20" align="left" valign="top"><b>{data.thana}</b>&nbsp;</td>
                      </tr>
                      <tr>
                        <td width="10%" align="left"  valign="top">&nbsp;</td>
                        <td width="32%" height="20" align="left"  valign="top">तहसील</td>
                        <td className="td1" width="33%" height="20" align="left" valign="top"><b>{data.sbd}</b></td>
                      </tr>
                      <tr>
                        <td width="10%" align="left"  valign="top">&nbsp;</td>
                        <td width="32%" height="20" align="left"  valign="top">जिला</td>
                        <td className="td1" width="33%" height="20" align="left" valign="top"><b>{data.district}</b></td>
                      </tr>
                    </tbody>
                  </table>&nbsp;
                </td>
              </tr>
              <tr>
                <td colSpan={6}>
                  उत्तर प्रदेश का/की निवासी है व उसका वर्तमान पता मकान नम्बर <u><b> {data.house} </b></u> ग्राम् <b><u> {data.village} </u></b> मोहल्ला <u><b> {data.mohalla} </b></u> तहसील <u><b> {data.sbd} </b></u>, जनपद <u><b> {data.district} </b></u> उत्तर प्रदेश है | <br />
                  2.उपर्युक्त की पुष्टि प्रारूप - १ में आवेदन एवं सत्यापनकर्ता द्वारा उपलब्ध कराई गई सूचना तथा इससे संतुष्ट हो जाने के उपरान्त अधोहस्ताक्षरी द्वारा उत्तर प्रदेश के इस जनपद का सामान्य निवासी होने विषयक प्रमाण पत्र निर्गत किया जा रहा है।
                </td>
              </tr>
              <tr><td colSpan={6}><div className="h-4" /></td></tr>
               <tr><td colSpan={6}><QRCode value={qrCodeValue} size={100} /></td></tr>
              <tr><td colSpan={6}><div className="h-4" /></td></tr>
              <tr>
                <td align="center" colSpan={6}>
                  <table className="table2" border={0} align="center" width="100%" cellSpacing="0" cellPadding="0">
                    <tbody>
                      <tr>
                        <td align="left" width="50%" valign="bottom" colSpan={2}>
                          <b>जारी कर्ता केन्द्र: {data.vle}, सीएससी गवर्नेंस जन सेवा केंद्र</b>
                        </td>
                        <td width="50%" valign="top" rowSpan={2}>
                          <table border={0} width="100%" cellSpacing="0" cellPadding="0">
                            <tbody>
                              <tr>
                                <td className="td2" width="50%" valign="top" align="right">{data.officer} &nbsp;</td>
                                <td className="td3" align="left" valign="top" width="50%">Digitally Signed <br /> by {data.officer} <br /> O=Personal, <br /> S=Uttar Pradesh&nbsp;</td>
                              </tr>
                              <tr><td colSpan={2} align="center" >
                                <div className='text-center mt-2'>
                                  <b>सक्षम अधिकारी/उप जिलाधिकारी <br />डिजिटल हस्ताक्षरित<br />{data.sbd},{data.district} <br />दिनॉंक: <span className="dates">{formattedDate}</span></b>
                                </div>
                              </td></tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td align="left" width="50%" colSpan={2} valign="top">
                          <b>पद: {data.vle}, केन्द्र प्रभारी <br />स्थान :{data.address},{data.sbd},{data.district},अन्य (Other),{data.sbd},{data.district}<br />दिनॉंक: <span className="dates">{formattedDate}</span><br />हस्ताक्षर एंव मुहर</b>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr>
                <td align="center" colSpan={6} className="pt-4">
                  <span className="text-[6pt] font-bold">
                    यह प्रमाण पत्र इलेक्ट्रॉनिक डिलिवरी सिस्टम द्वारा तैयार किया गया है तथा डिजिटल सिग्नेचर से हस्ताक्षरित है। सम्बन्धित केन्द्र के अधिकृत कर्मी द्वारा प्रमाणित किया गया है। यह प्रमाण पत्र वेबसाइट http://edistrict.up.gov.in पर इसका पहले आवेदन क्र० फिर प्रमाणपत्र क्र० अंकित कर,सत्यापित किया जा सकता है।
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </CardContent>
      </Card>
    </>
  );
}
