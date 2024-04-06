import AttributeForm from "./components/attribute-form";
import { useSingleAttribute } from "./service/query/useSingleAttribute";
import { useParams } from "react-router-dom";

export const EditAttribute = () => {
  const { id } = useParams();
  const { data } = useSingleAttribute(id);
  console.log(data);

  return (
    <div>
      EditAttribute
      <AttributeForm />
    </div>
  );
};
