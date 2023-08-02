"use client";
import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import ReactMarkdown from "react-markdown";
import dynamic from "next/dynamic";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import remarkGfm from "remark-gfm";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";

import ImageUploadButton from "./ImageUploadButton";

const MdEditor = dynamic(() => import("@uiw/react-md-editor"), {
  ssr: false,
});

const formSchema = z.object({
  name: z
    .string()
    .min(6, {
      message: "Name must not be less than 8 characters",
    })
    .max(50),

  phone: z
    .string({
      invalid_type_error: "Invalid character",
    })
    .min(6, {
      message: "Phone must not be less than 8 characters",
    })
    .max(50),
  email: z.string().email({ message: "Invalid email address" }),
  address: z
    .string()
    .min(10, {
      message: "Enter full address",
    })
    .max(100),
  state: z
    .string()
    .min(3, {
      message: "state must not be less than 3 characters",
    })
    .max(50),
  postalcode: z
    .string()
    .min(6, {
      message: "Postcode must not be less than 6 characters",
    })
    .max(8),

  city: z
    .string()
    .min(3, {
      message: "City name must not be less than 3 characters",
    })
    .max(20),
  country: z
    .string()
    .min(3, {
      message: "Country name must not be less than 3 characters",
    })
    .max(50),
  latitude: z
    .string({
      invalid_type_error: "Invalid character",
    })
    .min(3, {
      message: "Latitude must not be less than 3 characters",
    })
    .max(50),
  longitude: z
    .string()
    .min(3, {
      message: "Latitude must not be less than 3 characters",
    })
    .max(50),
  road: z.string().min(6, {
    message: "Road name must not be less than 3 characters",
  }),
  place_id: z
    .string()
    .min(8, {
      message: "Place Id must not be less than 3 characters",
    })
    .max(50),
  photo: z.string().url({ message: "Invalid image URL" }).optional(),
  content: z.string(),
});

const HospitalForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      address: "",
      phone: "",
      state: "",
      postalcode: "",
      photo: "",
      city: "",
      country: "",
      place_id: "",
      latitude: "",
      longitude: "",
      content: "",
      road: "",
    },
  });

  const [markdownContent, setMarkdownContent] = useState<string>("");
  const router = useRouter();
  const { toast } = useToast();

  const handleEditorChange = (
    value?: string | undefined,
    event?: ChangeEvent<HTMLTextAreaElement> | undefined,
    state?: any
  ) => {
    setMarkdownContent(value || "");
  };

  const handleImageUpload = (imageUrl: string) => {
    form.setValue("photo", imageUrl); // Set the image URL in the form data
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    values.content = markdownContent; // Save the Markdown content to the hospital description field

    console.log("hospital formdata", values);
    try {
      const res = await fetch("/api/admin/hospitals/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (res.ok) {
        toast({
          title: "Hospital created",
        });
        console.log(res);
        router.push("/admin/hospitals");
      } else {
        toast({
          title: "Failed to create hospital",
        });
      }
    } catch (error) {
      console.log("Error creating hospital:", error);
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 pt-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Hospital Name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Hospital Email" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Hospital Phone" type="tel" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Hospital Address" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="road"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Road</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter Road" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter City" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem>
                <FormLabel>State</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter State" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter Country" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="postalcode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Postcode</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="" type="number" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="latitude"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Latitude</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="" type="number" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="longitude"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Longitude</FormLabel>

                <Input {...field} placeholder="" type="number" />

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="place_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Place Id</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter place id" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="photo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Photo</FormLabel>
                <FormControl>
                  <ImageUploadButton onImageURL={handleImageUpload} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <MdEditor
                    value={markdownContent}
                    onChange={handleEditorChange}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          {/* Preview the rendered Markdown */}
          <ReactMarkdown
            className=" max-w-none mt-2"
            remarkPlugins={[remarkGfm]}
          >
            {markdownContent}
          </ReactMarkdown>
          <div className="flex flex-center pt-4">
            <Button
              type="submit"
              className="bg-blue-900 text-white hover:bg-blue-500 text-[20px] font-medium leading-10 w-[100%] lg:w-[50%] tracking-wider "
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "Submiting..." : "Submit"}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default HospitalForm;
