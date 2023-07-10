import { Link, Outlet } from "react-router-dom";
import styled from "styled-components";

const Sidebar = styled.div`
  background-color: #f2f2f2;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
`;

const SearchForm = styled.form`
  margin-bottom: 20px;
`;

const SearchInput = styled.input`
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
  width: 200px;
`;


const NewButtonForm = styled.form`
  margin-bottom: 20px;
`;

const NewButton = styled.button`
  padding: 8px 16px;
  background-color: #4caf50;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const Navigation = styled.nav`
  margin-bottom: 20px;
`;

const NavigationList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;
const NavigationItem = styled.li`
  margin-bottom: 10px;
`;

// const Link = styled.a`
//   color: #333;
//   text-decoration: none;

//   &:hover {
//     text-decoration: underline;
//   }
// `;



export default function Root() {
  return (
    <>
      <Sidebar>
        <Title>React Router Contacts</Title>
        <div>
          <SearchForm id="search-form" role="search">
            <SearchInput
              id="q"
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
            />
            <div
              id="search-spinner"
              aria-hidden
              hidden={true}
            />
            <div
              className="sr-only"
              aria-live="polite"
            ></div>
          </SearchForm>
          <NewButtonForm method="post">
            <NewButton type="submit">New</NewButton>
          </NewButtonForm>
        </div>
        <Navigation>
          <NavigationList>
            <NavigationItem>
              <Link to={`contacts/1`}>Kazuya Umeki</Link>
            </NavigationItem>
            <NavigationItem>
              <Link to={`contacts/2`}>Friend's name</Link>
            </NavigationItem>
          </NavigationList>
        </Navigation>
      </Sidebar>
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
}