import React from 'react'

const EditPicture = ({photo}) => {
    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if (!file) return;

        if (file.size > 5 * 1024 * 1024) {
            toast.error("Image must be smaller than 5MB");
            return;
        }


        setLoading(true);
        const reader = new FileReader()
        reader.onloadend = () => {
            const photoBase64 = reader.result
            setPreview(photoBase64);
            setProfilePicture(photoBase64)
            formik.setFieldValue('profilePicture', photoBase64);
            setLoading(false);
        }

        reader.onerror = () => {
            toast.error("Failed to read file");
            setLoading(false);
        };

        reader.readAsDataURL(file)
    };

    const handleSave = async () => {
        try {
            const res = await axios.put('https://her-cycle-bloom-backend.onrender.com/user/create-profile', { profilePicture: photo },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            if (!res.status) {
                toast.error('Failed to edit picture')
            }
            toast.success('picture updated successfuly')

        } catch (error) {
            console.log('Error saving picture : ', error);
        }
    };



    return (
        <div >
            <div className="bg-white dark:bg-neutral-800 flex w-full items-center pt-10 pb-5">
                <img
                    onClick={() => navigate(-1)}
                    className='dark:invert'
                    src="./Arrow Left.svg" alt="arrow left"
                />
                <h1 className="font-bold text-lg lg:text-xl w-full text-center text-neutral-900 dark:text-neutral-100">
                    Profile
                </h1>
            </div>

            <div className='flex justify-center mt-5 relative'>
                <div className="bg-[#febcb7] rounded-full flex justify-center items-center size-16 dark:bg-neutral-900">
                    <img
                        className='size-16 rounded-full w-fit'
                        src={photo || "User Pic.png"} alt="Profile Picture"
                    />
                </div>

                <label
                    htmlFor='photo'
                    className='size-6 rounded-full bg-palevioletred items-center flex justify-center absolute top-12'>
                    <img
                        src="./edit-2.svg" alt="Edit"
                    />
                </label>

                <input
                    onClick={handleSave}
                    className='hidden'
                    accept='image/*'
                    name='photo'
                    id='photo'
                    type="file"
                />
            </div>
            </div>
            )
}

            export default EditPicture