import { connectDB } from "../lib/mongodb";
import User from "../models/User";

export async function getServerSideProps() {
  await connectDB();

  const users = await User.find()
    .sort({ balance: -1 }) // change to xp or messageCount later if you want
    .limit(10)
    .lean();

  return {
    props: {
      users: JSON.parse(JSON.stringify(users)),
    },
  };
}

export default function Leaderboard({ users }) {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Leaderboard</h1>

      <table style={styles.table}>
        <thead>
          <tr>
            <th>#</th>
            <th>Username</th>
            <th>Balance</th>
            <th>XP</th>
            <th>Messages</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u, i) => (
            <tr key={u._id}>
              <td>{i + 1}</td>
              <td>{u.username}</td>
              <td>{u.balance}</td>
              <td>{u.stardust}</td>
              <td>{u.messageCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  container: {
    padding: "40px",
    fontFamily: "Arial",
    background: "#0f0f0f",
    minHeight: "100vh",
    color: "#fff",
  },
  title: {
    marginBottom: "20px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    background: "#1a1a1a",
  },
};
