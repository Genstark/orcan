import React from "react";

function Team() {
  const team = [
    {
      name: "Dr. Sumit Bhateja",
      description:
        "Dr. Sumit Bhateja, Ph.D., leads the Oral Medicine & Radiology Department at Manav Rachna Dental College, with 13 years of teaching experience and prolific publications.",
      imgUrl: "./1.jpg",
    },
    {
      name: "Dr. Neeru Rani",
      description:
        "Dr. Neeru Rani has completed her BDS course from Manav Rachna Dental College, Faridabad. Presently working as Intern, at Manav Rachna Dental College, Faridabad.",
      imgUrl: "./2.jpg",
    },
    {
      name: "Dr. Arushi Bhatia",
      description:
        "Dr. Arushi Bhatia has completed her BDS from Manav Rachna Dental College, Faridabad. She is Gold Medalist from Pt. BD Sharma University, Rohtak, Haryana.",
      imgUrl: "./3.jpg",
    },
  ];
  return (
    <div
      className="team-bg"
      style={{
        minHeight: "90vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        borderRadius: 20,
      }}
    >
      <p
        className="p-t sixtyfour brightblue"
        style={{
          textAlign: "center",
          lineHeight: 1,
          color: "#488092",
          marginBottom: 60,
        }}
      >
        TEAM TO TRUST
      </p>
      <br />
      <div className="row d-flex justify-content-around">
        {team.map((item, index) => (
          <div className="col-xl-2 col-lg-2 col-md-3" key={index}>
            <div
              className="greyBackground team-card"
              style={{
                backgroundImage: `url(${item.imgUrl})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }}
            ></div>
            <p
              className="p-t twentyeight black mt-3"
              style={{ textAlign: "center" }}
            >
              {item.name}
            </p>
            <p
              className="mm eighteen black mt-3"
              style={{ textAlign: "center", lineHeight: 1.2 }}
            >
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Team;
