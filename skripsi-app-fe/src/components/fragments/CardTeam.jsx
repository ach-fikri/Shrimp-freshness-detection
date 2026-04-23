const CardTeam = (props) => {
    const {teamMember, index} = props
    return (
        <div key={index}
             className="card shadow-2xl transform hover:scale-105 transition-transform duration-300 w-full">
            <figure className="px-10 pt-10">
                <img src={teamMember.image} alt={teamMember.name}
                     className="rounded-full w-48 h-48 object-cover mx-auto"/>
            </figure>
            <div className="card-body items-center text-center">
                <h2 className="card-title text-2xl font-bold">{teamMember.name}</h2>
                <p className="text-xl italic mb-4">{teamMember.position}</p>
                <p className="mb-4">{teamMember.description}</p>
                <div className="card-actions flex justify-center space-x-4">
                    {teamMember.socialLinks.linkedin && (
                        <a href={teamMember.socialLinks.linkedin}
                           className="btn btn-outline btn-accent">
                            LinkedIn
                        </a>
                    )}
                    {teamMember.socialLinks.twitter && (
                        <a href={teamMember.socialLinks.twitter} className="btn btn-outline btn-accent">
                            Twitter
                        </a>
                    )}
                </div>
            </div>
        </div>
    )
}

export default CardTeam;