import { useRouter } from "next/router";
import styles from "../../styles/Home.module.css";
import UserCard from "../../components/User";
import ClientOnly from "../../components/ClientOnly";
export default function User() {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <ClientOnly>
        <UserCard id={router.query.id} />
      </ClientOnly>
    </div>
  );
}
