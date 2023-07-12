export enum LoaderSize {
    SMALL,
    DEFAULT,
    LARGE
} 

export const Loader = ({ size, text = "Loading..." } : { size: LoaderSize, text: string }) => {

    return (

        <div className="w-full h-full flex flex-col items-center justify-center">
            <span className="loading loading-ring loading-lg"/>
            <span className="opacity-50 animate-pulse my-7">
                {text}
            </span>
        </div>

    )

}