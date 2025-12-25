"use client"
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { calculateDays } from "@/helpers/calculateDays";
import { ApiResponse } from "@/types/ApiResponse";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod"

type StaffType={
    _id : string;
    name : string;
    email : string;
    salary : number;
    lastPayment? : Date
}

const SalarySchema = z.object({
    salary: z.string()
    .min(1, "Salary cannot be empty.") 
    .pipe(z.coerce.number()
        .min(1000, "Salary must be at least 1000 INR.")
        .positive("Salary must be a positive number.")
    )
});

type SalaryFormValues = z.infer<typeof SalarySchema>;

type SalaryFormInput={
    salary : string;
}

function StaffPage(){
    const [staffs,setStaffs]=useState<StaffType[] | null>(null)
    const [open,setOpen]=useState(false)
    const router=useRouter()
    const form=useForm<SalaryFormInput>({
        defaultValues : {
            salary : ""
        }
    })
    const getStaffs=async ()=>{
        try {
            const res=await axios.get('/api/get-staff')
            if(!res){
                toast.error("No staffs found")
                return;
            }
            setStaffs(res.data.staffs)
        } catch (error) {
            const axiosError=error as AxiosError<ApiResponse>
            console.log(axiosError.response?.data.message)
            toast.error(axiosError.response?.data.message || "")
        }
    }
    const onSubmit=async (data : SalaryFormValues,staffId : string)=>{
        try {
            const res=await axios.patch(`/api/assign-salary/${staffId}`,{
                salary : data.salary
            })
            if(!res){
                toast.error("Couldn't assign salary")
                return;
            }
            await getStaffs()
            toast.success("Salary assigned successfully")
            setOpen(false)
        } catch (error) {
            const axiosError=error as AxiosError<ApiResponse>
            console.log(axiosError.response?.data.message)
            toast.error(axiosError.response?.data.message || "")
        }
    }
    useEffect(()=>{
        getStaffs()
    },[])
    return (
        <div className="w-full max-w-7xl mx-auto px-4 py-6">
            {staffs ? (
                staffs.length > 0 ? (
                <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">

                    {/* Table wrapper for mobile */}
                    <div className="overflow-x-auto">
                    <Table>
                        <TableCaption className="text-slate-500">
                        A list of current working staffs.
                        </TableCaption>

                        <TableHeader>
                        <TableRow className="bg-slate-100 dark:bg-slate-800">
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Salary</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                        </TableHeader>

                        <TableBody>
                        {staffs.map((staff) => (
                            <TableRow
                            key={staff._id}
                            className="hover:bg-slate-50 dark:hover:bg-slate-800 transition"
                            >
                            {/* Name */}
                            <TableCell className="font-medium">
                                {staff.name}
                            </TableCell>

                            {/* Email */}
                            <TableCell className="text-slate-500">
                                {staff.email}
                            </TableCell>

                            {/* Salary */}
                            <TableCell>
                                {staff.salary === 0 ? (
                                <Dialog>
                                    <DialogTrigger asChild>
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        className="border-emerald-500 text-emerald-600"
                                    >
                                        Assign Salary
                                    </Button>
                                    </DialogTrigger>

                                    <DialogContent className="sm:max-w-[425px] rounded-xl">
                                    <DialogHeader>
                                        <DialogTitle>
                                        Assign Salary
                                        </DialogTitle>
                                        <DialogDescription>
                                        Assign salary to <b>{staff.name}</b>
                                        </DialogDescription>
                                    </DialogHeader>

                                    <Form {...form}>
                                        <form
                                        onSubmit={form.handleSubmit((data) =>
                                            onSubmit(data, staff._id)
                                        )}
                                        className="space-y-4"
                                        >
                                        <FormField
                                            control={form.control}
                                            name="salary"
                                            render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Salary</FormLabel>
                                                <FormControl>
                                                <Input
                                                    type="number"
                                                    placeholder="Enter salary"
                                                    {...field}
                                                />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                            )}
                                        />

                                        <div className="flex justify-end gap-3">
                                            <DialogClose asChild>
                                            <Button variant="outline">Cancel</Button>
                                            </DialogClose>
                                            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                                            Assign
                                            </Button>
                                        </div>
                                        </form>
                                    </Form>
                                    </DialogContent>
                                </Dialog>
                                ) : (
                                <span className="font-semibold text-slate-800 dark:text-slate-100">
                                    ₹ {staff.salary}
                                </span>
                                )}
                            </TableCell>

                            {/* Status */}
                            <TableCell>
                                {staff.salary === 0 ? (
                                <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-700">
                                    Salary Not Assigned
                                </span>
                                ) : staff.lastPayment &&
                                calculateDays(staff.lastPayment) <= 30 ? (
                                <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700">
                                    Salary Paid
                                </span>
                                ) : (
                                <Button
                                    size="sm"
                                    onClick={() =>
                                    router.push(
                                        `/payment/staff/${staff._id}/?amount=${staff.salary}`
                                    )
                                    }
                                    className="bg-indigo-600 hover:bg-indigo-700 text-white"
                                >
                                    Pay Salary
                                </Button>
                                )}
                            </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                    </div>
                </div>
                ) : (
                <div className="flex items-center justify-center h-[50vh] text-slate-500">
                    No staffs found 👥
                </div>
                )
            ) : (
                <div className="flex items-center justify-center h-[50vh]">
                <span className="animate-pulse text-slate-500">Loading...</span>
                </div>
            )}
            </div>
    );
}

export default StaffPage;
