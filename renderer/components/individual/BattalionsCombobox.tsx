import { Combobox } from "@/renderer/components/ui/combobox";
import { useBattalionStore } from "@/renderer/store/battalionStore";
import { useEffect } from "react";

export const BattalionCombobox = ({
  onChange,
}: {
  onChange: (id: number) => void;
}) => {
  const { battalions, loading, error, fetchBattalions } = useBattalionStore();

  useEffect(() => {
    fetchBattalions();
  }, []);

  return (
    <Combobox
      options={battalions.map((i) => ({ label: i.name, value: i.id }))}
      onChange={(value) => onChange(Number(value))}
    />
  );
};
