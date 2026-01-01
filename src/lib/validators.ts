import { z } from 'zod';

export const domicileFormSchema = z.object({
  date: z.string({ required_error: 'जारी दिनांक आवश्यक है' }).min(1, 'जारी दिनांक आवश्यक है'),
  district: z.string().min(1, 'जिला आवश्यक है'),
  sbd: z.string().min(1, 'तहसील आवश्यक है'),
  thana: z.string().min(1, 'थाना आवश्यक है'),
  avedan: z.string().min(1, 'आवेदन क्रमांक आवश्यक है'),
  kram: z.string().min(1, 'प्रमाण पत्र संख्या आवश्यक है'),
  name: z.string().min(1, 'नाम (English) आवश्यक है'),
  hname: z.string().min(1, 'नाम (हिंदी) आवश्यक है'),
  selectedOption: z.string().min(1, 'कृपया अभिभावक चुनें'),
  fname: z.string().min(1, 'पिता/पति का नाम आवश्यक है'),
  mname: z.string().min(1, 'माता का नाम आवश्यक है'),
  house: z.string().min(1, 'मकान संख्या आवश्यक है'),
  mohalla: z.string().min(1, 'मोहल्ला आवश्यक है'),
  village: z.string().min(1, 'गाँव का नाम आवश्यक है'),
  officer: z.string().min(1, 'Officer Name आवश्यक है'),
  address: z.string().min(1, 'CSC Address आवश्यक है'),
  vle: z.string().min(1, 'VLE Name आवश्यक है'),
});

export type DomicileFormSchema = z.infer<typeof domicileFormSchema>;
