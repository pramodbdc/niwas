'use client';

import type { SubmittedData } from '@/app/page';
import { Button } from './ui/button';
import QRCode from "react-qr-code";
import { Printer } from 'lucide-react';
import Image from 'next/image';

interface DomicilePDFProps {
  data: SubmittedData;
  onBack: () => void;
}

export default function DomicilePDF({ data, onBack }: DomicilePDFProps) {
  const formattedDate = data.date ? new Date(data.date).toLocaleDateString('en-GB') : '';
  const qrCodeValue = `https://edistrict.up.gov.in/portal/services/verifyCertificate.aspx?avl_no=${data.avedan}&cert_no=${data.kram}`;

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <div className="bg-white p-4 rounded-lg shadow-xl max-w-4xl w-full relative">
          <div id="printable-area" className="printable-area relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 opacity-10">
                <Image src="/background.png" alt="UP Government Logo" width={400} height={400} />
            </div>
            <div className="relative z-10">
            <table border={0} align="center" width="90%" cellSpacing="0" cellPadding="0" style={{border: '1px solid #000000', paddingLeft: '4px', paddingRight: '4px', paddingTop: '1px', paddingBottom: '1px', fontSize: '10pt', fontFamily: 'Arial Unicode MS'}}>
                <tbody>
                  <tr><td colSpan={6}>&nbsp;ई-डिस्ट्रिक्ट के अन्तर्गत जारी..</td></tr>
                  <tr><td colSpan={6}><p align="center"><Image src="/logo.jpg" alt="logo" width="110" height="110" /></p></td></tr>
                  <tr><td colSpan={6}><p align="center"><font size="6">उत्तर प्रदेश शासन</font></p></td></tr>
                  <tr><td colSpan={6}><p align="center"><b><font size="4">कार्यालय उप जिलाधिकारी द्वारा प्रदत्त सामान्य निवास प्रमाण पत्र</font></b></p></td></tr>
                  <tr><td colSpan={6}>&nbsp;</td></tr>
                  <tr><td width="17%"><b>जिला </b></td><td><b>{data.district}</b></td><td width="30%" colSpan={3} align="right">&nbsp;</td><td align="left" width="35%">&nbsp;</td></tr>
                  <tr><td width="17%"><b>तहसील </b></td><td><b>{data.sbd}</b></td><td width="30%" colSpan={3} align="right">&nbsp;</td><td align="left" width="35%"><b>जारी दिनांक: <span style={{fontSize: '11px', fontFamily: 'verdana'}}>{formattedDate}</span></b></td></tr>
                  <tr><td width="17%" valign="top"><b>आवेदन क्र०</b></td><td width="30%" valign="top"><b><span style={{fontSize: '11px', fontFamily: 'verdana'}}>{data.avedan}</span></b></td><td width="30%" colSpan={3} valign="top" align="left">&nbsp;</td><td width="35%" align="right">&nbsp;</td></tr>
                  <tr><td width="17%" valign="top"><b>प्रमाणपत्र क्र०</b></td><td width="30%" valign="top"><b><span style={{fontSize: '11px', fontFamily: 'verdana'}}>{data.kram}</span></b></td><td width="30%" colSpan={3} valign="top" align="left">&nbsp;</td><td width="35%" align="right">&nbsp;</td></tr>
                  <tr><td colSpan={6}>&nbsp;</td></tr>
                  <tr><td colSpan={6}><table border={0} style={{fontSize: '10pt'}} width="100%" cellSpacing="0" cellPadding="0"><tbody>
                    <tr>
                        <td width="10%" align="left" valign="top">&nbsp;</td>
                        <td width="32%" align="left" colSpan={2} valign="top">सम्बन्धित लेखपाल की जांच आख्या दिनांक <span style={{fontSize: '11px', fontFamily: 'verdana'}}>{formattedDate}</span> के आधार पर एतद् द्वारा</td>
                        <td width="25%" rowSpan={6} align="left" valign="top"><Image style={{width: '96px', height: '96px', objectFit: 'cover'}} src={data.photoUrl} alt="Applicant" width={96} height={96} /></td>
                    </tr>
                    <tr><td width="10%" align="left" valign="top">&nbsp;</td><td width="32%" height="20" align="left" valign="middle">प्रमाणित किया जाता है कि</td><td width="33%" height="20" align="left" valign="middle" style={{fontFamily: 'verdana'}}><b>  {data.hname}/{data.name}</b></td></tr>
                    <tr><td width="10%" align="left" valign="top">&nbsp;</td><td width="32%" height="20" align="left" valign="middle">{data.selectedOption}</td><td width="33%" height="20" align="left" valign="middle" style={{fontFamily: 'verdana'}}><b>  {data.fname}</b></td></tr>
                    <tr><td width="10%" align="left" valign="top">&nbsp;</td><td width="32%" height="20" align="left" valign="middle">माता का नाम</td><td width="33%" height="20" align="left" valign="middle" style={{fontFamily: 'verdana'}}><b>{data.mname}</b></td></tr>
                    <tr><td width="10%" align="left" valign="top">&nbsp;</td><td width="32%" height="20" align="left" valign="middle">मकान नम्बर</td><td width="33%" height="20" align="left" valign="middle" style={{fontFamily: 'verdana'}}><b>{data.house}</b></td></tr>
                    <tr><td width="10%" align="left" valign="top">&nbsp;</td><td width="32%" height="20" align="left" valign="middle">मोहल्ला</td><td width="33%" height="20" align="left" valign="middle" style={{fontFamily: 'verdana'}}><b>{data.mohalla}</b></td></tr>
                    <tr><td width="20%" align="left" valign="top">&nbsp;</td><td width="32%" height="20" align="left" valign="top">ग्राम</td><td width="33%" height="20" align="left" valign="top" style={{fontFamily: 'verdana'}}><b>{data.village}</b>&nbsp;</td></tr>
                    <tr><td width="20%" align="left" valign="top">&nbsp;</td><td width="32%" height="20" align="left" valign="top">थाना</td><td width="33%" height="20" align="left" valign="top" style={{fontFamily: 'verdana'}}><b>{data.thana}</b>&nbsp;</td></tr>
                    <tr><td width="10%" align="left" valign="top">&nbsp;</td><td width="32%" height="20" align="left" valign="top">तहसील</td><td width="33%" height="20" align="left" valign="top" style={{fontFamily: 'verdana'}}><b>{data.sbd}</b></td></tr>
                    <tr><td width="10%" align="left" valign="top">&nbsp;</td><td width="32%" height="20" align="left" valign="top">जिला</td><td width="33%" height="20" align="left" valign="top" style={{fontFamily: 'verdana'}}><b>{data.district}</b></td></tr>
                  </tbody></table>&nbsp;</td></tr>
                  <tr><td colSpan={6}>उत्तर प्रदेश का/की निवासी है व उसका वर्तमान पता मकान नम्बर <u><b>{data.house}</b></u> ग्राम् <b><u>{data.village} </u></b>मोहल्ला <u><b>{data.mohalla}</b></u> तहसील <u><b>{data.sbd}</b></u> ,जनपद <u><b>{data.district}</b></u> उत्तर प्रदेश है |<br/>2.उपर्युक्त की पुष्टि प्रारूप - १ में आवेदन एवं  सत्यापनकर्ता द्वारा उपलब्ध कराई गई सूचना तथा इससे संतुष्ट हो जाने के उपरान्त अधोहस्ताक्षरी द्वारा उत्तर प्रदेश के इस जनपद का सामान्य निवासी होने विषयक प्रमाण पत्र निर्गत किया जा रहा है।</td></tr>
                  <tr><td colSpan={6}>&nbsp;</td></tr>
                  <tr><td colSpan={6}><div style={{paddingLeft: '4px'}}><QRCode value={qrCodeValue} size={100} /></div></td></tr>
                  <tr><td align="center" colSpan={6}><table border={0} style={{fontSize: '10pt'}} align="center" width="100%" cellSpacing="0" cellPadding="0"><tbody>
                    <tr>
                        <td align="left" width="50%" valign="bottom" colSpan={2}><b>जारी कर्ता केन्द्र: {data.vle},सीएससी गवर्नेंस जन सेवा केंद्र</b></td>
                        <td width="50%" valign="top" rowSpan={2}><table border={0} width="100%" cellSpacing="0" cellPadding="0" id="table1"><tbody>
                            <tr>
                                <td width="50%" valign="top" style={{fontSize: '14px', fontFamily: 'Arial'}} align="right">{data.officer}&nbsp;</td>
                                <td align="left" valign="top" width="50%" style={{fontSize: '8px', fontFamily: 'Arial'}}>Digitally Signed by {data.officer}  O=Personal, S=Uttar Pradesh&nbsp;</td>
                            </tr>
                            <tr><td colSpan={2} align="center" >
                              <div style={{textAlign: 'center', marginTop: '0.5rem'}}>
                                <b>सक्षम अधिकारी/उप जिलाधिकारी <br />डिजिटल हस्ताक्षरित<br />{data.sbd},{data.district} <br />दिनॉंक: <span style={{fontSize: '11px', fontFamily: 'verdana'}}>{formattedDate}</span></b>
                              </div>
                            </td></tr>
                        </tbody></table>&nbsp;</td>
                    </tr>
                    <tr>
                        <td align="left" width="50%" colSpan={2} valign="top"><b>पद: {data.vle}, केन्द्र प्रभारी <br/>स्थान :{data.address},{data.sbd},{data.district},अन्य (Other),{data.sbd},{data.district}<br/>दिनॉंक: <span style={{fontSize: '11px', fontFamily: 'verdana'}}>{formattedDate}</span><br/>हस्ताक्षर एंव मुहर  </b></td>
                    </tr>
                  </tbody></table></td></tr>
                  <tr><td align="center" colSpan={6} style={{paddingTop: '1rem'}}><font size="1pt"><b>यह प्रमाण पत्र इलेक्ट्रॉनिक डिलिवरी सिस्टम द्वारा तैयार किया गया है तथा डिजिटल सिग्नेचर से हस्ताक्षरित है। सम्बन्धित केन्द्र के अधिकृत कर्मी द्वारा प्रमाणित किया गया है। यह प्रमाण पत्र वेबसाइट https://edistrict.up.gov.in पर इसका  पहले आवेदन क्र० फिर प्रमाणपत्र क्र० अंकित कर,सत्यापित किया जा सकता है। </b></font></td></tr>
                </tbody>
              </table>
              </div>
          </div>
          <div className="no-print mt-4 flex justify-between">
              <Button variant="outline" onClick={onBack}>Back to Form</Button>
              <Button onClick={handlePrint}><Printer className="mr-2 h-4 w-4" /> Print</Button>
          </div>
        </div>
      </div>
      <style jsx global>{`
        @media print {
          body > *:not(#printable-area) {
            display: none !important;
          }
          #printable-area {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            padding: 15px;
            margin: 0;
            background-color: #fff !important;
            -webkit-print-color-adjust: exact;
            color-adjust: exact;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}
