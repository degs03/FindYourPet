'use client'


const PetDetail = ({ pet }) => {
    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all max-w-lg w-full">
                <div className="flex">
                    <div className="flex-none w-48 relative">
                        <img
                            alt="Sport Top"
                            className="absolute inset-0 w-full h-full object-cover"
                            height="192"
                            src={`${pet.image}`}
                            style={{
                                aspectRatio: "192/192",
                                objectFit: "cover",
                            }}
                            width="192"
                        />
                    </div>
                    <div className="flex-1 p-6">
                        <p className="text-lg font-semibold">Sport Top</p>
                        <p className="text-sm text-gray-600">
                            Deportiva y moderna, ideal para un look deportivo auténtico. Talla S para mujer.
                        </p>
                        <p className="text-2xl font-bold mt-4">15.5 $</p>
                        <div className="mt-4">
                            <p className="text-sm">
                                <strong>SIZE:</strong> S
                            </p>
                            <p className="text-sm">
                                <strong>Color:</strong> Gris
                            </p>
                            <p className="text-sm">
                                <strong>Disponibles:</strong> 3
                            </p>
                        </div>
                        <div className="mt-6">
                            <Button className="w-full">Add to cart</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PetDetail;