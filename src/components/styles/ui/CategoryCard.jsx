import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";

const CategoryCard = ({ name, icon: Icon }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/courses/${name.toLowerCase()}`); // الانتقال للصفحة الخاصة بالتصنيف
  };

  return (
    <Card
      className="flex flex-col items-center justify-center p-4 bg-gray-100 hover:bg-gray-200 transition rounded-lg cursor-pointer"
      onClick={handleClick}
    >
      <Icon className="w-10 h-10 text-primary" />
      <p className="mt-2 font-medium">{name}</p>
    </Card>
  );
};

export default CategoryCard;
