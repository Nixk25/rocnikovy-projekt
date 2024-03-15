import React, { useState, FormEvent } from "react";
import { Button } from "./ui/button";
import { IoTrashBinSharp } from "react-icons/io5";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

const RemoveBtn = ({ id }: any) => {
  const [confirmed, setConfirmed] = useState<boolean>(false);
  const router = useRouter();

  const handleDeleteBtn = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (confirmed) {
      const res = await fetch(`/api/recipes?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        toast.success("Recept byl smazán");
        router.refresh();
      } else {
        toast.error("Nepovedlo se smazat váš recept");
      }
    }
    return;
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="destructive"
          className=" hover:border-red-500 p-5 border-2 border-transparent rounded-full transition-all duration-150 ease-in"
        >
          <IoTrashBinSharp size={20} />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <form className="flex flex-col gap-5" onSubmit={handleDeleteBtn}>
          <DialogHeader>
            <DialogTitle>Opravdu jste si jist?</DialogTitle>
            <DialogDescription>
              Tato akce nejde vrátit zpět. Opravdu si přejete vymazat váš
              recept?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose>
              <Button
                variant="destructive"
                onClick={() => setConfirmed(true)}
                type="submit"
              >
                Vymazat
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RemoveBtn;
