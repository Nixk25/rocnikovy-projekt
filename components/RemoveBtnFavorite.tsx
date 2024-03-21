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

const RemoveBtnFavorite = ({ id, userId }: any) => {
  const [confirmed, setConfirmed] = useState<boolean>(false);
  const router = useRouter();

  const handleDeleteBtn = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (confirmed) {
      //@ts-ignore
      const response = await fetch(`/api/recipes/favorite/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        //@ts-ignore
        body: JSON.stringify({ userId: userId }),
      });

      if (response.ok) {
        toast.success("Recept byl smazán z oblíbených");
        localStorage.removeItem(id);
        router.refresh();
      } else {
        toast.error("Nepovedlo se smazat váš recept z oblíbených");
      }
    }
    return;
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="destructive"
          className="p-5 transition-all duration-150 ease-in border-2 border-transparent rounded-full hover:border-red-500"
        >
          <IoTrashBinSharp size={20} />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <form className="flex flex-col gap-5" onSubmit={handleDeleteBtn}>
          <DialogHeader>
            <DialogTitle>Vymazat recept z oblíbených?</DialogTitle>
            <DialogDescription>
              Tato akce nejde vrátit zpět. Opravdu si přejete vymazat váš recept
              z oblíbených?
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

export default RemoveBtnFavorite;
