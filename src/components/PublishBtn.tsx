import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaSpinner } from "react-icons/fa";
import axios from "axios";
import { MdOutlinePublish } from "react-icons/md";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";
import { toast } from "./ui/use-toast";
import useDesigner from "./hooks/useDesigner";

function PublishFormBtn({ id }: { id: number }) {
  const { elements } = useDesigner();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function publishForm() {
    setLoading(true);
    try {
      const resp = await axios.patch(`/api/publishform?formid=${id}`, {
        content: elements,
      });
      if (resp.status === 200) {
        console.log("Form published successfully");
        router.replace(window.location.href);
        setLoading(false);
      }
    } catch {
      toast({
        title: "Error",
        description: "Something went wrong",
      });
      setLoading(false);
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="gap-2 text-white bg-indigo-500">
          <MdOutlinePublish className="h-4 w-4" />
          Publish
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. After publishing, you will not be able
            to edit this form. <br />
            <br />
            <span className="font-medium">
              By publishing this form, you will make it available to the public
              and be able to collect submissions.
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={loading}
            onClick={(e) => {
              e.preventDefault();
              publishForm();
            }}
            className="bg-indigo-500 hover:bg-indigo-600"
          >
            Proceed {loading && <FaSpinner className="animate-spin" />}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default PublishFormBtn;
