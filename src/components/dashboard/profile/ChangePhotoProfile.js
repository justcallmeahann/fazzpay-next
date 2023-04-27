import {
  useEffect,
  useState,
} from 'react';

import Image from 'next/image';
import {
  useDispatch,
  useSelector,
} from 'react-redux';
import { toast } from 'react-toastify';

import { updateProfileImage } from '@/services/https/profile';
import { profileAction } from '@/store/slices/profile';

function ChangePhotoProfile({ isOpen, onClose }) {
  const [selectedFile, setSelectedFile] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [preview, setPreview] = useState();
  const { id_user, token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }

    // I've kept this example simple by using the first image instead of multiple
    setSelectedFile(e.target.files[0]);
  };
  const dispatch = useDispatch();
  const updateHandler = () => {
    setIsLoading(true);
    updateProfileImage({ image: selectedFile, userId: id_user }, token)
      .then(() => {
        setIsLoading(false);
        setSelectedFile();
        toast.success("Success update image!");
        dispatch(profileAction.getProfileThunk({ id_user, token }));
        onClose();
      })
      .catch((err) => {
        setIsLoading(false);
        if (err.response?.data?.msg) {
          toast.error(err.response.data.msg);
          return;
        }
        toast.error("An error ocurred");
      });
  };

  return (
    <div
      className={`fixed inset-0 z-30 bg-black/80 flex justify-center items-center select-none ${
        isOpen ? "block" : "hidden"
      }`}
      onClick={onClose}
    >
      <section
        className="bg-white opacity-100 text-dark p-7 rounded-2xl w-[28rem] relative"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <button className="absolute right-7" onClick={onClose}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 1L1 15"
              stroke="#3A3D42"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M1 1L15 15"
              stroke="#3A3D42"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <p className="text-lg font-semibold">Change Profile Photo</p>
        <p className="text-sm text-secondary-context">Preview goes here</p>
        <div className="flex flex-col items-center gap-5 my-5">
          <input
            id="image"
            name="image"
            type="file"
            onChange={onSelectFile}
            accept="image/*"
            className="hidden"
          />

          {selectedFile && (
            <>
              <div className="avatar shadow-card-md">
                <div className="w-32 rounded">
                  <Image
                    src={preview}
                    alt={`preview`}
                    width={100}
                    height={100}
                  />
                </div>
              </div>
            </>
          )}

          <label htmlFor="image">
            <div className="btn">Select File</div>
          </label>

          <div className="ml-auto">
            <button
              className={`submit mt-5 btn px-8 bg-primary border-2 border-white capitalize hover:bg-primary-focus hover:border-gray-200 ${
                isLoading ? "loading" : ""
              }`}
              disabled={!selectedFile || isLoading}
              onClick={updateHandler}
            >
              Upload
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ChangePhotoProfile;
