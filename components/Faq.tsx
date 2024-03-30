import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Faq = () => {
  return (
    <section className="my-20">
      <div className="container">
        <Accordion type="single" collapsible className="w-full ">
          <AccordionItem value="item-1">
            <AccordionTrigger>Jak mohu vyhledávat recepty?</AccordionTrigger>
            <AccordionContent>
              Můžete vyhledávat recepty pomocí našeho vyhledávacího pole. Stačí
              zadat název receptu. Klidně bez diakritiky.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>
              Mohu přidat své vlastní recepty?
            </AccordionTrigger>
            <AccordionContent>
              Ano, můžete přidat své vlastní recepty. Stačí se zaregistrovat a
              následně se přihlásit a po kliknutí na svůj profil kliknout na
              tlačítko "Přidat recept" a vyplnit požadované informace.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Je tato aplikace zdarma?</AccordionTrigger>
            <AccordionContent>
              Ano, naše aplikace je zdarma k použití. V budoucnu budou možné i
              prémiové funkce za předplatné.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>Jak mohu kontaktovat podporu?</AccordionTrigger>
            <AccordionContent>
              Můžete nás kontaktovat prostřednictvím zprávy na náš e-mail na
              adresu podpora@receptyapp.cz.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger>Je moje data v bezpečí?</AccordionTrigger>
            <AccordionContent>
              Ano, vaše data jsou v bezpečí. Dodržujeme všechny standardy pro
              ochranu dat a vaše data nejsou sdílena s třetími stranami bez
              vašeho souhlasu. Také vaše heslo je šifrované, aby nikdo kromě vás
              neměl přístup k vašemu účtu.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
};

export default Faq;
