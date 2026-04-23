const CardFeature = (props) => {
    const {feature, key} = props
return (
    <div key={key}
         className="card bg-white shadow-xl transform hover:scale-105 transition-transform duration-300 p-6">
        <div className="flex flex-col items-center">
            <figure className="w-24 h-24 mb-6">
                <img src={feature.image} alt={feature.title}
                     className="rounded-full w-full h-full object-cover"/>
            </figure>
            <h2 className="card-title text-2xl font-bold text-center">{feature.title}</h2>
            <p className="mt-4 text-center">{feature.description}</p>
        </div>
    </div>
)
}


export default CardFeature;