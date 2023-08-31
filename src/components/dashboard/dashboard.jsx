import { Card, Typography } from "@material-tailwind/react";
 
const TABLE_HEAD = ["Name", "Email", "Employed", ""];
 
const TABLE_ROWS = [
  {
    name: "John Michael",
    email: "John@gmail.com",
    date: "23/04/18",
  },
  {
    name: "Alexa Liras",
    email: "charles@gmail.com",
    date: "23/04/18",
  },
  {
    name: "Laurent Perrier",
    email: "perrier@gmail.com",
    date: "19/09/17",
  },
  {
    name: "Michael Levi",
    email: "levi@gmail.com",
    date: "24/12/08",
  },
  {
    name: "Richard Gran",
    email: "Gran@gmail.com",
    date: "04/10/21", 
  },
  
];
 
export function Dashboard() {
  return (
    <Card className="relative top-[31.2rem] left-[21.2rem] h-[20rem] w-[63rem] overflow-scroll">
    {/* text-left */}
      <table className="w-full min-w-max table-auto text-center">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th
                key={head}
                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
              >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {TABLE_ROWS.map(({ name, email, date }, index) => {
            const isLast = index === TABLE_ROWS.length - 1;
            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
 
            return (
              <tr key={name}>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {name}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {email}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {date}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    as="a"
                    href="#"
                    variant="small"
                    color="blue-gray"
                    className="font-medium"
                  >
                    Edit
                  </Typography>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Card>
  );
}