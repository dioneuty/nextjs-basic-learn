'use server';

import {z} from 'zod';
import { customers } from './placeholder-data';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const FormSchema = z.object({
    id: z.string(),
    customerId: z.string(),
    amount: z.coerce.number(),
    status: z.enum(['pending', 'paid']),
    date: z.string(),
})

const CreateInvoice = FormSchema.omit({id: true, date: true});

export async function createInvoice(formData: FormData) {
//   const rawFormData = {
//     customerId: formData.get('customeId'),
//     amount: formData.get('amount'),
//     status: formData.get('status'),
//   }

    const { customerId, amount, status } = CreateInvoice.parse({
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status'),
    })
    const amountInCents = amount * 100;
    const date = new Date().toISOString().split('T')[0];

  const rawFormData = Object.fromEntries(formData.entries())
  // 테스트해보세요:
//   console.log(typeof rawFormData.amount);
  try{
    await sql`  INSERT INTO invoices (customer_id, amount, status, date)
    VALUES (${customerId}, ${amountInCents}, ${status}, ${date})`;
  } catch (error) {
    return {
      message: '데이터베이스 오류: 인보이스 생성에 오류가 발생하였습니다.'
    };
  }

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

const UpdateInvoice = FormSchema.omit({ id: true, date: true });

export async function updateInvoice(id: string, formData: FormData) {
    const { customerId, amount, status } = UpdateInvoice.parse({
      customerId: formData.get('customerId'),
      amount: formData.get('amount'),
      status: formData.get('status'),
    });
  
    const amountInCents = amount * 100;
  
    try {
      await sql`  UPDATE invoices
      SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
      WHERE id = ${id}`;
    } catch (error) {
      return {message: '데이터베이스 오류: 인보이스 수정에 오류가 발생하였습니다.'}
    }

    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');
}

export async function deleteInvoice(id: string) {
  try{
    await sql`DELETE FROM invoices WHERE id = ${id}`;
    revalidatePath('/dashboard/invoices');
    return { message: '인보이스가 삭제되었습니다'}
  } catch(error){
    return { message: '데이터베이스 오류: 인보이스 삭제에 오류가 발생하였습니다'}
  }
}  