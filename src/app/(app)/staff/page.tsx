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
import z from "zod"

function StaffPage(){
    const [staffs,setStaffs]=useState([])
    const [open,setOpen]=useState(false)
    const router=useRouter()
    const form=useForm({
        resolver : zodResolver(z.object({
            salary : z.coerce.number({message : "Must be a number"}).min(1000,{message : "Salary must be atleast 1000"})
        }))
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
    const onSubmit=async (data,staffId)=>{
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
        <div>
            {
                staffs.length>0 ? (
                    staffs.map(staff=>(
                        <Table key={staff._id}>
                        <TableCaption>A list of current working staffs.</TableCaption>
                        <TableHeader>
                            <TableRow>
                            <TableHead className="w-[100px]">Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Salary</TableHead>
                            <TableHead>Salary Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell className="font-medium">{staff.name}</TableCell>
                                <TableCell className="font-medium">{staff.email}</TableCell>
                                <TableCell className="font-medium">
                                    {
                                        staff.salary===0 ? (
                                            <Dialog open={open} onOpenChange={setOpen}>
                                                <DialogTrigger asChild>
                                                <Button variant="outline">Assign Salary</Button>
                                                </DialogTrigger>
                                                <DialogContent className="sm:max-w-[425px]">
                                                <DialogHeader>
                                                    <DialogTitle>Assign Salary to {staff.name}</DialogTitle>
                                                    <DialogDescription>
                                                    Click assign to assigning salary
                                                    </DialogDescription>
                                                </DialogHeader>
                                                <Form {...form}>
                                                <form onSubmit={form.handleSubmit((data)=>onSubmit(data,staff._id))} className="space-y-8">
                                                    <FormField
                                                    control={form.control}
                                                    name="salary"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                        <FormLabel>Salary</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="Enter salary here" {...field} type="number"/>
                                                        </FormControl>
                                                        <FormDescription>
                                                            Assign salary to {staff.name}
                                                        </FormDescription>
                                                        <FormMessage />
                                                        </FormItem>
                                                    )}
                                                    />
                                                    <Button type="submit">Assign</Button>
                                                </form>
                                                </Form>
                                                <DialogFooter>
                                                    <DialogClose asChild>
                                                    <Button variant="outline">Cancel</Button>
                                                    </DialogClose>
                                                </DialogFooter>
                                                </DialogContent>
                                            </Dialog>
                                        ) : (`${staff.salary}`)
                                    }
                                </TableCell>
                                <TableCell className="font-medium">
                                    {
                                        staff.salary===0 ? (<>Assign Salary First</>) : (
                                            staff.lastPayment ? (
                                                calculateDays(staff.lastPayment)<=30 ? (<>Salary Paid</>) : (<Button onClick={()=>router.push(`/payment/staff/${staff._id}/?amount=${staff.salary}`)}>Pay Salary</Button>)
                                            ) : (<Button onClick={()=>router.push(`/payment/staff/${staff._id}/?amount=${staff.salary}`)}>Pay Salary</Button>)
                                        )
                                    }
                                </TableCell>
                            </TableRow>
                        </TableBody>
                        </Table>
                    ))
                ) : (<div>No Staffs found</div>)
            }
        </div>
    );
}

export default StaffPage;
