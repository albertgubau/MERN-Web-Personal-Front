import { useState, useEffect } from "react";
import { size } from "lodash";
import { Newsletter } from "../../../../api";
import { useAuth } from "../../../../hooks";
import { EmailItem } from "../EmailItem/EmailItem";
import { Loader, Pagination } from "semantic-ui-react";
import "./EmailsList.scss";

const newsletterController = new Newsletter();

export function EmailsList(props) {
  const { reload, onReload } = props;

  const { accessToken } = useAuth();

  const [emails, setEmails] = useState(null);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState();

  useEffect(() => {
    (async () => {
      try {
        const response = await newsletterController.getEmails(
          accessToken,
          page
        );
        setEmails(response.docs);
        setPagination({
          limit: response.limit,
          page: response.page,
          totalPages: response.totalPages,
        });
      } catch (error) {
        console.error(error);
      }
    })();
  }, [page, reload]);

  const changePage = (_, data) => {
    setPage(data.activePage);
  };

  if (!emails) return <Loader active inline="centered" />;
  if (size(emails) === 0)
    return "There are no emails subscribed to the Newsletter";

  return (
    <div className="emails-list">
      <div className="emails-list__items">
        {emails.map((email) => (
          <EmailItem key={email._id} email={email} onReload={onReload} />
        ))}
      </div>

      <div className="emails-list__pagination">
        <Pagination
          totalPages={pagination.totalPages}
          defaultActivePage={pagination.page}
          ellipsisItem={null}
          firstItem={null}
          lastItem={null}
          onPageChange={changePage}
        />
      </div>
    </div>
  );
}
