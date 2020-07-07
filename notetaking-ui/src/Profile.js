import React from "react";
import { useQuery } from "@apollo/react-hooks";
// import { notify } from "react-notify-toast";
import gql from "graphql-tag";

const Profile_QUERY = gql`
  {
    getProfile {
      name
      email
      password
    }
  }
`;

const Profile = () => {
  // const [title, setTitle] = useState("");
  // const [content, setContent] = useState("");
  // const [password, setPass] = useState("");
  const { loading, error, data } = useQuery(Profile_QUERY);

  // const [updateNote] = useMutation(UPDATE_NOTE);

  if (loading) return <div>Fetching Details</div>;
  if (error) return `Error! ${error.message}`;

  // set the  result gotten from rhe GraphQL server into the note variable.
  const note = data;
  console.log(data);

  return (
    <div className="container m-t-20">
      <h1 className="page-title">Profile</h1>

      <div className="newnote-page m-t-20">
        <form
          onSubmit={e => {
            // Stop the form from submitting
            e.preventDefault();

            // set the title of the note to the title in the state, if not's available set to the original title gotten from the GraphQL server
            // set the content of the note to the content in the state, if not's available set to the original content gotten from the GraphQL server
            // pass the id, title and content as variables to the UPDATE_NOTE mutation.
            // updateNote({
            //   variables: {
            //     _id: note.getNote._id,
            //     title: title ? title : note.getNote.title,
            //     content: content ? content : note.getNote.content
            //   }
            // });

            // notify.show("Note was edited successfully", "success");
          }}
        >
          <div className="field">
            <label className="label">Name</label>
            <div className="control">
              <input
                className="input"
                type="text"
                name="title"
                placeholder="Note Title"
                defaultValue={note.getProfile.name}
                // onChange={e => setTitle(e.target.value)}
                readOnly
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Email</label>
            <div className="control">
              <input
                className="input"
                name="content"
                placeholder="Note Content here..."
                defaultValue={note.getProfile.email}
                // onChange={e => setContent(e.target.value)}
                readOnly
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Password</label>
            <div className="control">
              <input
                className="input"
                name="password"
                placeholder="Note Content here..."
                defaultValue={note.getProfile.password}
                // onChange={e => setPass(e.target.value)}
                readOnly
              />
            </div>
          </div>
          <div className="field">
            {/* <div className="control">
              <button className="button is-link">Submit</button>
            </div> */}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
